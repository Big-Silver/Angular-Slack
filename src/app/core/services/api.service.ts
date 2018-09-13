import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

const baseURL = environment.baseURL;

@Injectable()
export class ApiService {

  constructor(private httpClient: HttpClient ) { }

  login(form) {
    return this.post('/auth/login', form);
  }

  register(form) {
    return this.post('/auth/register', form);
  }

  validate(token) {
    return this.get('/auth/validate', token);
  }

  getChats(token) {
    return this.get('/chats', token);
  }

  private get(url, token = '') {
    if (token) {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'x-access-token': token
        })
      };

      return this.httpClient.get(`${baseURL}${url}`, httpOptions);
    }

    return this.httpClient.get(`${baseURL}${url}`);
  }

  private post(url, data, token = '') {
    if (token) {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'x-access-token': token
        })
      };

      return this.httpClient.post(`${baseURL}${url}`, data, httpOptions);
    }

    return this.httpClient.post(`${baseURL}${url}`, data);
  }
}
