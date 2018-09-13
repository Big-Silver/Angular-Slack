export class User {
  username: string;
  email: string;
  token: string;

  isLoggedIn() {
    return this.token !== '';
  }

  constructor(username = '', email = '', token = '') {
    this.username = username;
    this.email = email;
    this.token = token;
  }

  cloneWithToken(token: string) {
    return new User(this.username, this.email, token);
  }

  cloneWithInfo(username: string, email: string) {
    return new User(username, email, this.token);
  }
}
