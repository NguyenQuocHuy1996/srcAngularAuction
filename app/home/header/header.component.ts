import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component ({
  selector: 'app-header',
  templateUrl: './header.component.html'
})

export class HeaderComponent {
  @Input () check: boolean;
  @Input () userName: any;
  isLogged: boolean;
  constructor(private router: Router) {

  }
  logOut() {
    // this.isLogged = false;
    // localStorage.setItem('currentUser', JSON.stringify({ userName: '', check: this.isLogged }));
    // this.router.navigate(['/']);
    // window.location.reload();
    // console.log(this.isLogged);
    localStorage.removeItem('currentUser');
    window.location.reload();
  }
}
