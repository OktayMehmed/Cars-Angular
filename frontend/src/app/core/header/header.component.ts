import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { IUser } from '../interfaces';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnChanges  {
  showNav = false

  get currentUser(): IUser {
    return this.userService.currentUser;
  }

  constructor(private userService: UserService) {}

  ngOnChanges(): void {
    this.userService.currentUser;
  }


  logoutHandler() {
    this.userService.logout();
  }

}
