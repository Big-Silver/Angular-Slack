import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class ChangePasswordService {

  constructor(private http: Http) { }

  change(form) {
    console.log(form);

    return this.http.post('http://192.168.0.27:8080/changepwd', {
      oldpwd: form.oldPassword,
      newpwd: form.password
    })
    .map(res => res.json());
  }

}
