import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from '../interfaces';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  showNav = false

  get currentUser(): IUser {
    return this.userService.currentUser;
  }

  constructor(private userService: UserService, private router: Router) {
  }

  logoutHandler() {
    this.userService.logout();
    this.showNav = false
    this.router.navigate(['/home'])
  }

}
