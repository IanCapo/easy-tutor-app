import { webSocket } from 'rxjs/webSocket';
import { environment } from './../environments/environment';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
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

    private socket: any; 

    listen(eventName: string) {
      return new Observable((subscriber) => {
        this.socket.on(eventName, (data: any) => {
          subscriber.next(data)
        })
      })
    }

    // asyncListen(eventName: string) {
    //   return new Observable((subscriber) => {
    //     this.socket.on(eventName, async (data: any) => {
    //       subscriber.next(data)
    //     })
    //   })
    // }

    emit(eventName: string, data: any) {
      this.socket.emit(eventName, data)
    }
}
