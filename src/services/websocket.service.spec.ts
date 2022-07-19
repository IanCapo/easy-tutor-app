import { TestBed } from '@angular/core/testing';
import { createServer } from "http";
import { io as Client } from "socket.io-client";
import { Server } from "socket.io";

import { WebsocketService } from './websocket.service';

describe('WebsocketService', () => {
  let service: WebsocketService;
  // let io, serverSocket, clientSocket;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WebsocketService);
  });

  // beforeEach(() => {
  //   const server = createServer();
  //   io = new Server(server);
  //   server.listen(() => {
  //     const serverAddress = server.address();
  //     const port = serverAddress;
  //   })
  // })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


});
