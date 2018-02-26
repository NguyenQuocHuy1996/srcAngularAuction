import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component ({
  selector: 'app-header',
  templateUrl: './header.component.html'
})

export class HeaderComponent {
  @Input () check: boolean;
  @Input () userName: any;
  constructor(private router: Router){

  }
  logOut() {
    this.check = false;
    localStorage.setItem('currentUser', JSON.stringify({ check: this.check }));
    this.router.navigate(['/']);
  }
}
