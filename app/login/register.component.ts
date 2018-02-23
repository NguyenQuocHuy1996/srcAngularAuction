import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RegisterService } from './../service/register.service';
import { UserService } from './../service/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./login.component.css']
})

export class RegisterComponent implements OnInit {
  userArr: any;
  user: any;
  userEmail: any;
  pass: any;
  repass: any;
  email: any;
  constructor(private router: Router, private activatedRoute: ActivatedRoute ,
              private userService: UserService,
              private registerService: RegisterService) {

  }

  ngOnInit(){
    this.userArr = {};
    this.user = {};
    this.userEmail = {};
    this.pass = {};
    this.repass = {};
    this.email = {};
  }

  goToHome(){
    this.router.navigate(['/']);
  }
  onPass(value: any) {
    this.pass = value;
  }
  onRePass(value: any){
    this.repass = value;
  }
  onEmail(value: any){
    this.email = value;

      this.userService.getOneUser(String(this.email)).subscribe((data) => {
        this.userArr = data;
        this.userEmail = this.userArr.map(function(a) {
          return a['email'];
        });
    }, error => alert('Error: ' + error));
  }
  onSubmit() {
    setTimeout(() => this.check(), 1000);
  }
  check(){
    if ( this.pass !== this.repass) {
      alert('Nhập lại mật khẩu chưa đúng');
    }else if (String(this.email) === String(this.userEmail)){
      alert('Email đã có người đăng ký');
    }else{
      this.registerService.Add(this.user).subscribe(respone => {
          alert('Đăng ký thành công');
          this.router.navigate(['/']);
      }, error => alert('Error: ' + error));
    };
  }
}
