import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { ApiService } from '../core/services/api.service';
import { UserService } from '../core/services/user.service';
import { User } from '../core/models';
import * as socketIo from 'socket.io-client';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Message } from './models';
import { environment } from '../../environments/environment.prod';

const baseURL = environment.baseURL;

@Injectable()
export class ChatsService {
  msgs = new BehaviorSubject<Message[]>([]);
  isSend = new BehaviorSubject<boolean>(false);

  private socket;
  private user: User;
  private isConnected: Boolean;
  private interval;

  constructor(
    private api: ApiService,
    private userService: UserService,
    private snackBar: MatSnackBar,
  ) {
    this.userService.user.subscribe(_user => { this.user = _user; });
    this.isConnected = true;
    this.interval = null;
  }

  getChats() {
    this.api.getChats(this.user.token)
      .subscribe((messages: Message[]) => {
        this.msgs.next(messages);
      });
  }

  initSocket() {
    this.socket = socketIo(baseURL, { query: 'token=' + this.user.token });

    this.socket.on('connect_failed', () => {
      this.socket.close();
    });

    this.socket.on('disconnect', () => {
      this.isConnected = false;
      this.connectionFailMessage();
      this.isSend.next(false);
      this.interval = window.setInterval(() => {
        if (this.isConnected) {
          clearInterval(this.interval);
          this.interval = null;
          return;
        }
        this.socket.connect();
      }, 5000);
      // this.socket.close();
    });

    this.socket.on('receive', (data: { msg: Message }) => {
      this.msgs.next([
        ...this.msgs.value,
        data.msg
      ]);
    });

    this.socket.on('connect', () => {
      this.isSend.next(true);
      if (!this.isConnected) {
        this.connectionSuccessMessage();
      }
      this.isConnected = true;
      this.getChats();
    });
  }

  sendMessage(text) {
    this.socket.emit('send', text);
  }

  disconnect() {
    this.socket.disconnect();
  }

  private connectionFailMessage() {
    setTimeout(() => {
      this.snackBar.open(`Try to reconnect.`, 'close', {
        duration: 10000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
        panelClass: 'error-msg'
      });
    });
  }

  private connectionSuccessMessage() {
    setTimeout(() => {
      this.snackBar.open(`The network was reconnected.`, 'close', {
        duration: 10000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
        panelClass: 'welcome-msg'
      });
    });
  }
}
