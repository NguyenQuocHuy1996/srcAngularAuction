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
  phone: any;
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
    document.getElementById('loading').style.display = 'block';
    setTimeout(() => this.check(), 4000);
  }
  check(){
    if ( this.pass !== this.repass) {
      document.getElementById('loading').style.display = 'none';
      alert('Nhập lại mật khẩu chưa đúng');
    }else if (String(this.email) === String(this.userEmail)){
      document.getElementById('loading').style.display = 'none';
      alert('Email đã có người đăng ký');
    }else{
      this.registerService.Add(this.user).subscribe(respone => {
          document.getElementById('loading').style.display = 'none';
          alert('Đăng ký thành công, bạn sẽ được chuyển tới trang đăng nhập');
          this.router.navigate(['/dang-nhap']);
      }, error => alert('Error: ' + error));
    };
  }
}
