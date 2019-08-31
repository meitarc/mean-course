import {Component, OnDestroy, OnInit} from '@angular/core';
import {WebSocketService} from '../web.socket.service';
import {AuthService} from '../../auth/auth.service';
import {AuthData} from '../../auth/auth-data.model';
import {Subscription} from 'rxjs';


@Component({
  selector: 'app-chat',
  templateUrl: 'chat.component.html',
  styleUrls: ['chat.component.css'],
  providers: [WebSocketService]

})

export class ChatComponent implements OnInit , OnDestroy {
  // tslint:disable-next-line: ban-types
  messageArray: Array<{user: String, message: String}> = [];
  messageText: string;
  userName: AuthData;
  username = this.authService.getUserName();
  userIsAuth = false;
  private authStateusSub: Subscription;

  constructor(private chatService: WebSocketService, private authService: AuthService) {
    this.chatService.newUserJoined().subscribe(data => {
      this.messageArray.push(data);
    });
    this.chatService.userLeftRoom().subscribe(
      data => {
        this.messageArray.push(data);
      });
    this.chatService.newMessageRecevied().subscribe(data => {
      this.messageArray.push(data);
    });
  }


  join() {
    this.chatService.joinRoom({ user: this.authService.getUserName()});
  }
  leave() {
    this.chatService.leaveRoom({ user: this.authService.getUserName() });
  }
  sendMessage() {
    if (this.messageText !== '' && this.messageText != null) {
          this.chatService.sendMessage({ user: this.authService.getUserName(), message: this.messageText});
          this.messageText = '';
    }
  }

  ngOnInit() {
    this.join();
    this.userIsAuth = this.authService.getIsAuth();
    this.authStateusSub = this.authService
      .getAuthStatusListener()
      .subscribe((isAuthenticated) => {
        this.userIsAuth = isAuthenticated;
      });
    }


    ngOnDestroy() {
      this.leave();
    }

}
