import { Component, OnInit } from '@angular/core';
import { LoginService } from './../service/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})

export class HomeComponent implements OnInit {
  currentUser: any;
  check: boolean;
  userName: any;

  constructor (private loginService: LoginService){

  }

  ngOnInit() {
    this.check = false;
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.userName = this.currentUser.userName;
    this.check = this.currentUser.check;
    this.loginService.SetLogin(this.check);
  }
}
