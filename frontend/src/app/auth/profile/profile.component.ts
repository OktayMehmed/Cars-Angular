import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IUser } from 'src/app/core/interfaces';
import { UserService } from 'src/app/core/services/user.service';
import { passwordMatch } from '../utils';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  currentUser!: IUser;
  errorMessage: string = '';
  loader: boolean = true

  passwordControl = new FormControl(null, [Validators.required ,Validators.minLength(4)]);

  get passwordsGroup(): FormGroup {
    return this.profileFormGroup.controls['passwords'] as FormGroup;
  }

  profileFormGroup: FormGroup = this.formBuilder.group({
    username: new FormControl(this.userService.currentUser.name, [Validators.required, Validators.minLength(5)]),
    email: new FormControl(this.userService.currentUser.email, [Validators.required]),
    passwords: new FormGroup({
      password: this.passwordControl,
      rePassword: new FormControl(null, [Validators.required ,passwordMatch(this.passwordControl)])
    })
  })

  constructor(
    private formBuilder: FormBuilder, 
    private userService: UserService,
    private router: Router
    ) {
  }

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

  submitProfile() {
    const { username, email, passwords } = this.profileFormGroup.value;

    const body = {
      name: username,
      email: email,
      password: passwords.password
    }

    this.userService.updateProfile(body).subscribe({
      next: () => {
        this.router.navigate(['/home'])
      },
      error: (e) => {
        this.errorMessage = e.error.message
      }
    })

  }

}
