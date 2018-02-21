import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { LoginService } from '../service/login.service';

@Injectable()
export class CheckLoginGuard implements CanActivate {
  constructor (private loginService: LoginService, private router: Router) {

  }
  canActivate(){
    let status = this.loginService.IsLogged();
    if(status != true){
      this.router.navigate (['/']);
    }
    return status;
  }
}
