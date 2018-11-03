import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { justOneName } from 'src/app/helpers/name';
import { RegisterService } from 'src/app/services/register.service';
import { UserService } from 'src/app/services/user.service';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  errorMsg;
  constructor(
    private fb: FormBuilder,
    private register: RegisterService,
    private user: UserService
  ) { }

  ngOnInit() {
    this.registerForm = this.fb.group({
      fullName: ['', [Validators.required, justOneName]],
      phoneNumber: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  get f() { return this.registerForm.controls; }

  registerUser() {
    if (this.registerForm.invalid) {
      return;
    }

    this.register.user(this.registerForm.value).subscribe(result => {
        this.user.user(result);
        console.log(result)
      },
      err => {
        if (err.err.status === 401) {
          this.errorMsg = 'Phone or Email already exist';
        }
      }
    );


  }


}
