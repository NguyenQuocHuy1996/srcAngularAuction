import { Component, OnInit } from '@angular/core';
import { LoginService } from './../../service/login.service';

@Component ({
  selector: 'app-header',
  templateUrl: './header.component.html'
})

export class HeaderComponent implements OnInit {
  public check: boolean;
  public user: any;
  currentUser: any;

  constructor(private loginService: LoginService){

  }

  ngOnInit() {
    this.check = false;
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.user = this.currentUser.userName;
    this.check = this.currentUser.check;
    console.log(this.user);
    console.log(this.check);
  }
}
