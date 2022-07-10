import { environment } from './../environments/environment';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';


@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  isRoomCreator: boolean = false;
    roomId: string;  

    constructor() { 
      this.socket = io(environment.socketUrl);
    }

    public socket: any; 

    listen(eventName: string) {  
      return new Observable((subscriber) => {
        this.socket.on(eventName, (data: any) => {          
          const eventData = {...data, socketId: this.socket.id}
          subscriber.next(eventData)
        })
      })
    }

    emit(eventName: string, data: any) {
      let eventData: any;
      if(eventName === 'message') {
        let message = data;
        eventData = {msg: message, socketId: this.socket.id}
      } else {
        eventData = {...data, socketId: this.socket.id}
      }

      this.socket.emit(eventName, eventData)
    }
}
