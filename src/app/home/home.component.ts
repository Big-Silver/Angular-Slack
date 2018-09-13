import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { UserService } from '../core/services/user.service';
import { User } from '../core/models/user';

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

  constructor(
    private userService: UserService,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
    this.user$ = this.userService.user.subscribe(u => {
      this.user = u;

      if (u.username && this.showWelcome) {
        this.showWelcomeMessage();
      }
    });
  }

  ngOnDestroy() {
    this.user$.unsubscribe();
  }

  logout() {
    console.log('Logout');
    this.userService.resetUser();
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
