import { catchError } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { WebsocketService } from 'src/services/websocket.service';
import { ActivatedRoute, ParamMap } from '@angular/router'

@Component({
  selector: 'app-session-main',
  templateUrl: './session-main.component.html',
  styleUrls: ['./session-main.component.scss']
})
export class SessionMainComponent implements OnInit {
  isRoomCreator: boolean = false;
  roomId: any;
  mContraints = {
    audio: true,
    video: true
  };
  
  public isMobile = this.isMobileDevice();
  public localStream: any;
  public localStreamClone: any;
  public remoteStream: any;
  private socketID : string;
  public startedConnection = false;
  public disableChat = true;
  public isSessionEnded = false;
  public isCameraOn = false;
  public isLoading = {
    local: false,
    remote: false
  }

  public isChatShowing = false;
  
  iceServers = {
    iceServers: [
      { urls: 'stun:stun.l.google.com:19302' },
      { urls: 'stun:stun1.l.google.com:19302' }
    ]
  }

  public rtcPeerConnection: RTCPeerConnection

  constructor(private websocket: WebsocketService, private route: ActivatedRoute) {
    this.socketID = websocket.socket.id
  }


  ngOnInit(): void {
    console.log(this.isMobile);
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.roomId = params.get('room');
    })
    
    this.websocket.listen('join').subscribe((data) => {
      console.log(data);
    })

    this.websocket.listen('room_created').subscribe(async (data: any) => {
      this.isLoading.local = true;
      this.isRoomCreator = true;
      this.roomId = data.roomId;
      
      let localStreamSuccess = await this.setLocalStream();
      if(!localStreamSuccess) {
        alert('Please enable camera and microfone.')
      }
    })

    this.websocket.listen('room_joined').subscribe(async (data: any) => {
      this.roomId = data.roomId;
      let localStreamSuccess = await this.setLocalStream();
      if(localStreamSuccess) {
        console.log('local success');
        
        this.isLoading.local = false;
        this.startCall();
      }
    })

    this.websocket.listen('room_inaccesabible').subscribe((data: any) => {
      console.log('room full', data.roomId);
    })

    this.websocket.listen('starting_call').subscribe(async() => {
        this.isLoading.remote = true;
        this.disableChat = false;
        this.rtcPeerConnection = await new RTCPeerConnection(this.iceServers);
        this.addLocalTracks(this.rtcPeerConnection);
        this.rtcPeerConnection.ontrack = (e) => {
            this.remoteStream = e.streams[0];
            this.remoteStream.getVideoTracks().forEach((track: MediaStreamTrack) => {
              track.addEventListener('ended', () => console.log('remote video muted'));
            })
            this.isLoading.remote = false;
        };  
        this.rtcPeerConnection.onicecandidate = this.sendIceCandidate;
        await this.createOffer(this.rtcPeerConnection);
    })

    this.websocket.listen('webrtc_offer').subscribe(async(e: any) => {
      console.log('socket event callback: webrtc_offer');
         this.rtcPeerConnection = new RTCPeerConnection(this.iceServers);
          this.addLocalTracks(this.rtcPeerConnection);
          this.rtcPeerConnection.ontrack = (e) => {
              this.remoteStream = e.streams[0];
              this.remoteStream.getVideoTracks().forEach((track: MediaStreamTrack) => {
                track.addEventListener('ended', () => console.log('remote video muted'));
              })
          };
          this.rtcPeerConnection.onicecandidate = e => this.sendIceCandidate(e);
          this.rtcPeerConnection.setRemoteDescription(new RTCSessionDescription(e));
  
          await this.answerOffer(this.rtcPeerConnection);
    }) 
  

    this.websocket.listen('webrtc_answer').subscribe((data: any) => {
      this.rtcPeerConnection.setRemoteDescription(new RTCSessionDescription(data));
    })

 

    this.websocket.listen('webrtc_ice_candidate').subscribe((data: any) => {
  
      let candidate = new RTCIceCandidate({
          sdpMLineIndex: data.label,
          candidate: data.candidate
      });
     
      this.rtcPeerConnection.addIceCandidate(candidate);
      })

      this.websocket.listen('disconnect_socket').subscribe(() => {
        this.remoteStream = null;
      })

      this.websocket.listen('message').subscribe((data: any) => {
        this.isChatShowing = true;
      })
  }

  connect() {
    console.log('connect', this.roomId);
    this.websocket.emit('join', { roomId: this.roomId })
    this.startedConnection = true;
  }

  startCall() {
    this.disableChat = false;
    console.log(this.roomId);
    this.websocket.emit('starting_call', 
      { roomId: this.roomId }
    );
  }

  setLocalStream = async () => {
    try {
      await navigator.mediaDevices.getUserMedia(this.mContraints)
      .then(mediaStream => {
          this.localStream = mediaStream;
          this.localStreamClone = mediaStream.clone();
          this.localStreamClone.getAudioTracks().forEach((track: MediaStreamTrack) => {
            track.enabled = false;
          })
          
      }) 
      this.isCameraOn = true;
      this.isLoading.local = false;
      return true
    } catch (e) {
      this.isCameraOn = false;
     return false;
    }
  }

  addLocalTracks = async (rtcPeerConnection: RTCPeerConnection) => {
    this.localStream.getTracks().forEach((track: any) => {
        rtcPeerConnection.addTrack(track, this.localStream);
    });
  }

  createOffer = async (rtcPeerConnection: RTCPeerConnection) => {
    let sessionDescription;

    try {
        sessionDescription = await rtcPeerConnection.createOffer();
        rtcPeerConnection.setLocalDescription(sessionDescription);
    } catch (e) {
        console.error(e)
    }
    
    this.websocket.emit('webrtc_offer', {
        type: 'webrtc_offer',
        sdp: sessionDescription,
        roomId: this.roomId
    });
}

answerOffer = async (rtcPeerConnection: RTCPeerConnection) => {
  let sessionDescription;
  try {
      sessionDescription = await rtcPeerConnection.createAnswer();
      rtcPeerConnection.setLocalDescription(sessionDescription);
  } catch (e) {
      console.error(e)
  }

  this.websocket.emit('webrtc_answer', {
      type: 'webrtc_answer',
      sdp: sessionDescription,
      roomId: this.roomId
  });
}

  sendIceCandidate = (e: any) => {
    if(e.candidate) {
        this.websocket.emit('webrtc_ice_candidate', {
            roomId: this.roomId,
            label: e.candidate.sdpMLineIndex,
            candidate: e.candidate.candidate
        });
    }
  }

  shareScreen =  async () => {
    const screenMediaStream = await this.getLocalScreenStream();
    const track = screenMediaStream?.getVideoTracks()[0];
    
    if(track) {
      if(this.replaceTrack(track)) {
        alert('you are now sharing your screen')
        track.addEventListener('ended', async () => {
          const stream = await navigator.mediaDevices.getUserMedia({video: true})
          let vTrack = stream.getTracks()[0]
          this.replaceTrack(vTrack)
        })
      } else {
        console.log('failed');
      }
    }
  }

  getLocalScreenStream = async () => {
    try{
      const stream = await navigator.mediaDevices.getDisplayMedia({ video: true, audio: false})
      return stream;
    } catch(e) {
      alert('Please enable screen capture in System Preferences and turn on camera.');
      return null;
    }
  }

  replaceTrack = (nTrack: any): boolean => {
    let success =  false;
    this.rtcPeerConnection.getSenders().forEach((sender: any) => {
      if(sender.track.kind === 'video') {
        sender.replaceTrack(nTrack);
        success = true;
      } else {
        success = false
      }
    })
    return success;
  }

  disconnectFromSession = () => {
    this.websocket.emit('disconnect_socket', {roomId: this.roomId});
    if(this.rtcPeerConnection)
      this.rtcPeerConnection.close();

    this.localStream.getTracks().forEach((track: any) => {
      track.stop();
      this.remoteStream = null;
      this.disableChat = true;
    })
    this.localStream = null;
    this.isSessionEnded = true;
  }

  rejoin() {
    this.isSessionEnded = false;
    console.log('rejoin');
    this.connect();
    this.isRoomCreator = false;
    this.isSessionEnded = false;
  }

  disbaleVideo() {
    console.log('click off');
    
    let localTrack = this.localStream.getTracks().find((track: any) => track.kind === 'video')
    localTrack.enabled = false;
    this.isCameraOn = false;
  }

  enableVideo = async () => {
    let localTrack = this.localStream.getTracks().find((track: any) => track.kind === 'video')
    localTrack.enabled = true;
    this.isCameraOn = true;
  }

  toggleChat() {
    this.isChatShowing = !this.isChatShowing;
  }

  isMobileDevice() {
    const userAgent = window.navigator.userAgent.toLowerCase()
    return userAgent.includes('mobile') || userAgent.includes('phone') || window.innerWidth < 769 ;
  }
}

