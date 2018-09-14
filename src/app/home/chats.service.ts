import { Injectable } from '@angular/core';
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

  private socket;
  private user: User;

  constructor(private api: ApiService, private userService: UserService) {
    this.userService.user.subscribe(_user => { this.user = _user; });
  }

  getChats() {
    this.api.getChats(this.user.token)
      .subscribe((messages: Message[]) => {
        this.msgs.next(messages);
        console.log(messages);
      });
  }

  initSocket() {
    this.socket = socketIo(baseURL, { query: 'token=' + this.user.token });

    this.socket.on('connect_failed', () => {
      this.socket.close();
    });

    this.socket.on('disconnect', () => {
      this.socket.close();
    });

    this.socket.on('receive', (data: { msg: Message }) => {
      this.msgs.next([
        ...this.msgs.value,
        data.msg
      ]);
    });
  }

  sendMessage(text) {
    this.socket.emit('send', text);
  }

  disconnect() {
    this.socket.disconnect();
  }
}
