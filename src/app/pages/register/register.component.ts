import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  constructor(private _AuthService:AuthService, private _Router:Router, private _FormBuilder:FormBuilder) {}

  msgError  :string   = '';
  isLoading :boolean  = false; 

  // Taking instance of FormGroup
  // registerForm: FormGroup = new FormGroup ({
  //   name       : new FormControl (null, [ Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
  //   email      : new FormControl (null, [ Validators.required, Validators.email]),
  //   password   : new FormControl (null, [ Validators.required, Validators.minLength(6), Validators.pattern(/^[A-Z][a-z0-9]{5,20}$/)]),
  //   rePassword : new FormControl (null, [ ]),
  //   phone      : new FormControl (null, [  Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]),
  // });

  // Making Form with FormBuilder
  registerForm :FormGroup = this._FormBuilder.group({
    name       : [null, [ Validators.required, Validators.minLength(3), Validators.maxLength(20)] ], 
    email      : [null, [ Validators.required, Validators.email] ], 
    password   : [null, [ Validators.required, Validators.minLength(6), Validators.pattern(/^[A-Z][a-z0-9]{5,20}$/)] ], 
    rePassword : [null, [ ]], 
    phone      : [null, [  Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)] ]
  }, {validators:[this.rePasswordValidation]})

  rePasswordValidation(group:FormGroup):void {
    let password   = group.get('password');
    let rePassword = group.get('rePassword');

    if(rePassword?.value == null || rePassword?.value == ''){
      rePassword?.setErrors({required: true})
    } else if(password?.value != rePassword?.value) {
      rePassword?.setErrors({misMatch: true})
    }
  }

  handleForm():void {
    if(this.registerForm.valid) {
      this.isLoading = true;
      this._AuthService.setRegister(this.registerForm.value).subscribe({
      next: res => {
        if(res.message == "success") {
          this.isLoading = false;
          this._Router.navigate(['/login']);
        }
      },
      error: (err :HttpErrorResponse) => {
        this.isLoading = false;
        this.msgError = err.error.message;
      }
    })
    // }  else {
    //   // if you don't want to disable submit button in case the form is invalid
    //   this.registerForm.markAllAsTouched()
    }
  }
}