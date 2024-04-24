import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(
    private _AuthService:AuthService, 
    private _Router:Router,
    private _FormBuilder:FormBuilder) {}

  msgError  :string   = '';
  isLoading :boolean  = false; 

  // Taking instance of FormGroup
  // loginForm: FormGroup = new FormGroup ({
  //   email      : new FormControl (null, [ Validators.required, Validators.email]),
  //   password   : new FormControl (null, [ Validators.required, Validators.minLength(6), Validators.pattern(/^[A-Z][a-z0-9]{5,20}$/)]),
  // });

  // Making Form with FormBuilder
  loginForm: FormGroup = this._FormBuilder.group({
    email   :[null, [ Validators.required, Validators.email] ],
    password:[null, [ Validators.required, Validators.minLength(6), Validators.pattern(/^[A-Z][a-z0-9]{5,20}$/)] ],
  })


  handleForm():void {
    if(this.loginForm.valid) {
      this.isLoading = true;
      this._AuthService.setLogin(this.loginForm.value).subscribe({
      next: res => {
        if(res.message == "success") {
          this.isLoading = false;
          // save userToken
          localStorage.setItem('userToken', res.token)
          this._AuthService.saveUserData();
          // navigate from login to home page
          this._Router.navigate(['/home']);
        }
      },
      error: (err :HttpErrorResponse) => {
        this.isLoading = false;
        // console.log(err);
        
        this.msgError = err.error.message;
      }
    })
    // } else {
    //   // if you don't want to disable submit button in case the form is invalid
    //   this.loginForm.markAllAsTouched()
    }
  }
}
