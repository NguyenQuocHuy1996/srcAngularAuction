import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './../service/login.service';
import { UserService } from 'app/service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  userArr: any;
  user: any ;
  pass: any ;
  userKeyup: any ;
  passKeyup: any ;
  constructor(private router: Router, private loginService: LoginService, private userService: UserService) {

  }
  onEmail(value: any){
    this.userKeyup = value ;

    this.userService.getOneUser(String(this.userKeyup)).subscribe((data) => {
        this.userArr = data;
        this.user = this.userArr.map(function(a) {
          return a['email'];
        });
        this.pass = this.userArr.map(function(b){
          return b['password'];
        });
    }, error => alert('Error: ' + error));
  }
  onPass(value: any){
    this.passKeyup = value ;
  }
  checkLogin(){
    if(this.userKeyup === String(this.user) && this.passKeyup === String(this.pass)) {
      this.loginService.SetLogin(true);
      this.loginService.SetUserName(String(this.user));
      alert('Đăng nhập thành công, bạn sẽ được chuyển tới trang chủ');
      this.router.navigate(['/']);
    }else {
      alert('Nhap lai');
    }
  }

  goToHome() {
    this.router.navigate(['/']);
  }

  ngOnInit() {
    this.userArr = {};
    this.user = {};
    this.pass = {};
    this.userKeyup = {};
    this.passKeyup = {};
  }
}
