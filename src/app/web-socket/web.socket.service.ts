import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import {Observable, Subject} from 'rxjs';
import {AuthService} from '../auth/auth.service';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

const BACKEND_URL = environment.apiUrl + '/userprofile/';

@Injectable({providedIn: 'root'})
export class WebSocketService {
  constructor(private userId: AuthService , private http: HttpClient) { }

  private socket = io('http://localhost:3000');

  joinRoom(data) {
    this.socket.emit('join', data);
  }

  newUserJoined() {
    const observable = new Observable<{user: string, message: string}>(observer => {
      this.socket.on('new user joined', (data) => {
        observer.next(data);
      });
      return () => {this.socket.disconnect(); };
    });
    return observable;
  }

  leaveRoom(data) {
    this.socket.emit('leave', data);
  }

  userLeftRoom() {
    const observable = new Observable<{user: string, message: string}>(observer => {
      this.socket.on('left room', (data) => {
        observer.next(data);
      });
      return () => {this.socket.disconnect(); };
    });
    return observable;
  }

  sendMessage(data) {
    this.socket.emit('message', data);
  }

  newMessageRecevied() {
    const observable = new Observable<{user: string, message: string}>(observer => {
      this.socket.on('new message', (data) => {
        observer.next(data);
      });
      return () => {this.socket.disconnect(); };
    });
    return observable;
  }


}

