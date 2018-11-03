import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  user: User;
  @Output() loggedIn = new EventEmitter<User>();

  constructor(
    private fb: FormBuilder,
    private login: LoginService,
    private userData: UserService
  ) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      login: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  loginUser() {
    this.login.logUserIn(this.loginForm.value).subscribe((result) => {
      this.userData.user(result);
    },
    err => console.log(err));
  }

  get f() { return this.loginForm.controls; }

}

export interface User {
  fullName: string;
  phoneNumber: string;
  email: string;
  status: string;
  dateCreated: string;
  dateModified: string;
}
