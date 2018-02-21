import { Injectable } from '@angular/core';
import { userInfo } from 'os';

@Injectable()
export class LoginService {
  public check: boolean;
  public user: any;
  IsLogged(): boolean {
    return this.check;
  }
  SetLogin(isLoggedIn: boolean) {
    this.check = isLoggedIn;
  }
  UserName() {
    return this.user;
  }
  SetUserName(userName: any) {
    this.user = userName;
  }
}
