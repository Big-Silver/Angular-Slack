import { Injectable } from '@angular/core';
import { ApiService } from '../core/services/api.service';
import { UserService } from '../core/services/user.service';

@Injectable()
export class AuthService {

  constructor(
    private api: ApiService,
    private user: UserService
  ) { }

  login(data) {
    return this.api.login(data)
      .map((res: any) => {
        this.user.setUser(res.user.username, res.user.email, res.token);
        return true;
      });
  }

  register(data) {
    return this.api.register(data)
      .map((res: any) => {
        this.user.setUser(res.user.username, res.user.email, res.token);
        return true;
      });
  }
}
