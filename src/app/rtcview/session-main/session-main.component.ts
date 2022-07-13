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
  
  localStream: any;
  remoteStream: any;
  socketID : string;
  startedConnection = false;
  disableChat = false;
  isSessionEnded = false;

  
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
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.roomId = params.get('room');
    })
    console.log('this.roomId from route', this.roomId);
    
    this.websocket.listen('join').subscribe((data) => {
      console.log(data);
    })

    this.websocket.listen('room_created').subscribe((data: any) => {
      console.log('data create room', data.roomId);
      
      this.isRoomCreator = true;
      this.roomId = data.roomId;
      console.log('roomId', this.roomId);
      
      this.setLocalStream();
    })

    this.websocket.listen('room_joined').subscribe(async (data: any) => {
      console.log('joined room', data.roomId);
      this.roomId = data.roomId;
      await this.setLocalStream();
      this.startCall();
      
    })

    this.websocket.listen('room_inaccesabible').subscribe((data: any) => {
      console.log('room full', data.roomId);
    })

    this.websocket.listen('starting_call').subscribe(async() => {
      console.log('started call');
      if(this.isRoomCreator) {
        this.rtcPeerConnection = await new RTCPeerConnection(this.iceServers);
        this.addLocalTracks(this.rtcPeerConnection);
        this.rtcPeerConnection.ontrack = (e) => {
            this.remoteStream = e.streams[0];
        };
        
        this.rtcPeerConnection.onicecandidate = this.sendIceCandidate;
        await this.createOffer(this.rtcPeerConnection);
     }  
    })

    this.websocket.listen('webrtc_offer').subscribe(async(e: any) => {
      console.log('socket event callback: webrtc_offer');
  
      if(!this.isRoomCreator) {
         this.rtcPeerConnection = new RTCPeerConnection(this.iceServers);
          this.addLocalTracks(this.rtcPeerConnection);
          this.rtcPeerConnection.ontrack = (e) => {
              this.remoteStream = e.streams[0];
          };
          this.rtcPeerConnection.onicecandidate = e => this.sendIceCandidate(e);
          this.rtcPeerConnection.setRemoteDescription(new RTCSessionDescription(e));
  
          await this.answerOffer(this.rtcPeerConnection);
      }
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
  }

  connect() {
    console.log('connect', this.roomId);
    this.websocket.emit('join', { roomId: this.roomId })
    this.startedConnection = true;
  }

  startCall() {
    console.log(this.roomId);
    
    this.websocket.emit('starting_call', 
      { roomId: this.roomId }
    );
  }

  setLocalStream  = async () => {
    await navigator.mediaDevices.getUserMedia(this.mContraints)
    .then(mediaStream => {
        this.localStream = mediaStream;
    }) 
  }

  addLocalTracks = async (rtcPeerConnection: RTCPeerConnection) => {
    console.log(this.localStream);

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

  disconnectFromSession = () => {
    // this.websocket.emit('disconnect_socket', {roomId: this.roomId});
    //this.rtcPeerConnection.close();
    this.localStream.getTracks().forEach((track: any) => {
      track.stop();
    })
    this.localStream = null;
    this.remoteStream = null;
    this.disableChat = true;
    this.isSessionEnded = true;
  }

  rejoin() {
    // todo
    console.log('jejoin');
    
    // this.connect();
    // this.isSessionEnded = false;
  }
}

