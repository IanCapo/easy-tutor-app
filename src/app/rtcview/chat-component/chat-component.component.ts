import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { WebsocketService } from 'src/services/websocket.service';

@Component({
  selector: 'app-chat-component',
  templateUrl: './chat-component.component.html',
  styleUrls: ['./chat-component.component.scss']
})
export class ChatComponentComponent implements OnInit {
  @Output() isConnectionClosed = new EventEmitter<boolean>();
  @Input() isDisableChat: boolean;

  socketID: string;
  public messages: Object[] = [];
  public messageInput: string = '';
  
  public isConnected = false;
  public isMobile: boolean = this.isMobileDevice();

  constructor(private websocket: WebsocketService) { 
    this.socketID = websocket.socket.is
   }

  ngOnInit(): void {
    this.websocket.listen('message').subscribe((data: any) => {
      this.messages.push({sender: 'received', message: data.msg})
      this.scrollDown();
    })

    this.websocket.listen('room_joined').subscribe(() => {
      this.isConnected = true;
    })

    this.websocket.listen('starting_call').subscribe(() => {
      this.isConnected = true;
    })

    this.websocket.listen('disconnect_socket').subscribe(() => {
      console.log('disconnecting');
      this.isConnected = false;
      this.isConnectionClosed.emit(true);
    })
  }


  sendChatMessage = (msg:string) => {
    this.websocket.emit('message',{
        msg: msg,
        socketId: this.socketID
    });
    this.messages.push({sender: 'self', message: msg})
    this.messageInput = '';
    this.scrollDown();
  }


  sendMessage = () => {
    this.sendChatMessage(this.messageInput);
    this.scrollDown();
  }

  scrollDown = () => {
    let div = document.querySelector(".message_container");
    if(div){
      let newPos = div.clientHeight;
      div.scrollTop = newPos;
    }
  }

  isMobileDevice() {
    const userAgent = window.navigator.userAgent.toLowerCase()
    return userAgent.includes('mobile') || userAgent.includes('phone') || window.innerWidth < 769 ;
  }
}
