import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { UserService } from '../core/services/user.service';
import { User } from '../core/models/user';
import { ChatsService } from './chats.service';
import { Message } from './models';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  user: User;
  user$: any;
  showWelcome = true;
  msgToSend = '';
  messages: Message[] = [];

  constructor(
    private userService: UserService,
    private snackBar: MatSnackBar,
    private chats: ChatsService
  ) { }

  ngOnInit() {
    this.user$ = this.userService.user.subscribe(u => {
      this.user = u;

      if (u.username && this.showWelcome) {
        this.showWelcomeMessage();
      }
    });

    this.chats.getChats();
    this.chats.initSocket();

    this.chats.msgs.subscribe((value: Message[]) => {
      this.messages = value;
    });
  }

  ngOnDestroy() {
    this.user$.unsubscribe();
  }

  logout() {
    this.userService.resetUser();
  }

  keydown(ev) {
    if (ev.keyCode === 13 && !ev.ctrlKey && !ev.shiftKey) {
      this.chats.sendMessage(this.msgToSend);
      this.msgToSend = '';
      ev.preventDefault();
    }
  }

  private showWelcomeMessage() {
    setTimeout(() => {
      this.snackBar.open(`Welcome, ${this.user.username}!`, '', {
        duration: 4000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
        panelClass: 'welcome-msg'
      });
      this.showWelcome = false;
    });
  }
}
