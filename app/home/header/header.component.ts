import { Component, OnInit } from '@angular/core';
import { LoginService } from './../../service/login.service';

@Component ({
  selector: 'app-header',
  templateUrl: './header.component.html'
})

export class HeaderComponent implements OnInit {
  public check: boolean;
  public user: any;

  constructor(private loginService: LoginService){

  }

  ngOnInit() {
    this.check = this.loginService.IsLogged();
    this.user = this.loginService.UserName();
  }
}
