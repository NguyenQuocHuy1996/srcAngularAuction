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
  username: any;
  userKeyup: any ;
  passKeyup: any ;
  isLogged: boolean;
  constructor(private router: Router, private loginService: LoginService, private userService: UserService) {

  }
  onEmail(value: any) {
    this.userKeyup = value ;

    this.userService.getOneUser(String(this.userKeyup)).subscribe((data) => {
        this.userArr = data;
        this.user = this.userArr.map(function(a) {
          return a['email'];
        });
        this.pass = this.userArr.map(function(b){
          return b['password'];
        });
        this.username = this.userArr.map(function(c){
          return c['firstname'];
        });
    }, error => alert('Error: ' + error));
  }
  onPass(value: any){
    this.passKeyup = value ;
  }
  checkLogin(){
    document.getElementById('loading').style.display = 'block';

    this.isLogged = true;
    localStorage.setItem('currentUser', JSON.stringify({ userEmail: this.user, userName: this.username, check: this.isLogged }));

    setTimeout(() => this.check(), 4000);
  }

  check() {
    if (this.userKeyup === String(this.user) && this.passKeyup === String(this.pass)) {
      this.loginService.SetLogin(true);
      this.loginService.SetUserName(String(this.user));
      this.router.navigate(['/']);
    }else {
      document.getElementById('loading').style.display = 'none';
      alert('Sai Email hoặc mật khẩu');
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
