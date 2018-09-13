import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Router } from '@angular/router';

import { User } from '../models';
import { ApiService } from './api.service';

@Injectable()
export class UserService {
  user: BehaviorSubject<User> = new BehaviorSubject(new User());

  constructor(private api: ApiService, private router: Router) {
    const token = localStorage.getItem('token');
    if (token) {
      const user = new User('', '', token);
      this.user =  new BehaviorSubject(user);

      api.validate(token)
        .subscribe(
          (res: any) => {
            const { username, email } = res.user;
            const newUser = new User(username, email, token);
            this.user.next(newUser);
          },
          err => {
            console.log(err);
            this.resetUser();
          }
        );
    }
  }

  setUser(username: string, email: string, token: string) {
    localStorage.setItem('token', token);
    const newUser = new User(username, email, token);
    this.user.next(newUser);
  }

  resetUser() {
    localStorage.removeItem('token');
    this.user.next(new User());
    this.router.navigate(['/login']);
  }

  isLoggedIn() {
    return this.user.value.isLoggedIn();
  }
}
