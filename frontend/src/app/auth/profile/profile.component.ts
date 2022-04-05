import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/core/interfaces';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  currentUser!: IUser;
  errorMessage: string = '';
  loader: boolean = true

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getProfile().subscribe({
      next: (user) => {
        this.currentUser = user;
        this.loader = false;
      },

      error: (e) => {
        this.errorMessage = e.error.message;
        this.loader = false;
      }
    })
  }

}
