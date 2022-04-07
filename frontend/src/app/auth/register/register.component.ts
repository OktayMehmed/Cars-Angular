import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';
import { passwordMatch } from '../utils'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  passwordControl = new FormControl(null, [Validators.required, Validators.minLength(4)]);
  errorMessage: string = "";

  get passwordsGroup(): FormGroup {
    return this.registerFormGroup.controls['passwords'] as FormGroup;
  }

  registerFormGroup: FormGroup = this.formBuilder.group({
    username: new FormControl(null, [Validators.required, Validators.minLength(5)]),
    email: new FormControl(null, [Validators.required]),
    passwords: new FormGroup({
      password: this.passwordControl,
      rePassword: new FormControl(null, [Validators.required, passwordMatch(this.passwordControl)])
    })
  })

  constructor(private formBuilder: FormBuilder, private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    if(!!this.userService.currentUser){
      this.router.navigate(['/home'])
    }
  }

  submitRegister() {
    const { username, email, passwords } = this.registerFormGroup.value;

    const body = {
      name: username,
      email: email,
      password: passwords.password
    }

    this.userService.register(body).subscribe({
      next: () => {
        this.router.navigate(['/home'])
      },
      error: err => this.errorMessage = err.error.message
    })
  }

}
