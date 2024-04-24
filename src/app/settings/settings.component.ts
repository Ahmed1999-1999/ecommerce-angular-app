import { Component } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent {
  constructor(
    private _AuthService:AuthService,
    private _FormBuilder:FormBuilder,
    private _Router:Router,
    private _ToastrService:ToastrService) {}

  msgError  :string   = '';
  email:string = '';
  resetCode:string = '';
  emailSent:boolean = false;
  codeSent:boolean = false;
  isLoading :boolean  = false; 

  // Making Form with FormBuilder

  // Forget Password Form
  ForgetPasswordForm: FormGroup = this._FormBuilder.group({
    email   :[null, [ Validators.required, Validators.email] ],
  })
  // Reset Code Form
  ResetCode: FormGroup = this._FormBuilder.group({
    resetCode   :[null, [ Validators.required] ],
  })
  // Reset Password Form
  ResetPassword: FormGroup = this._FormBuilder.group({
    newPassword   :[null, [ Validators.required, Validators.minLength(6), Validators.pattern(/^[A-Z][a-z0-9]{5,20}$/)] ],
  })

  handleGetPasswordForm():void {
    this.isLoading = true;
    this._AuthService.forgetPassword(this.ForgetPasswordForm.value).subscribe({
      next: res => {
        if(this.ForgetPasswordForm.valid) {
          this.email = this.ForgetPasswordForm.value.email;
          if(res.message == "Reset code sent to your email") {
            this._ToastrService.success(res.message,"FreshCart");
            this.emailSent = true;
            this.isLoading = false;
          }
        }},
      error: err => {
        this._ToastrService.error(err.error.message,"FreshCart");
        this.isLoading = false;
      },
    })
  }

  sendResetCode():void {
    let resetCode = this.ResetCode.value;
    this._AuthService.resetCode(resetCode).subscribe({
      next: res => {
        this.codeSent = true;
        if(res.status == "Success") {
          this._ToastrService.success(res.status,"FreshCart");
          this.emailSent = true;
        }
        
      },
      error: err => {
        this._ToastrService.error(err.error.message,"FreshCart");
      },
    })
  }

  resetPassword():void {
    this.isLoading = true;
    let userDataForm = this.ResetPassword.value;
    userDataForm.email = this.email;
    this._AuthService.resetPassword(userDataForm).subscribe({
      next: res => {
        if(this.ForgetPasswordForm.valid) {
            this._ToastrService.success("Password Updated","FreshCart");
            if (res.token) {
              localStorage.setItem('userToken',res.token);
              this._Router.navigate(['/home']);
            }
          }
      },
      error: err => {
        console.log(err);
      }
    })
  }

  // Update Password Form
  // Making Form with FormBuilder
  UpdatePasswordForm: FormGroup = this._FormBuilder.group({
    currentPassword : [null, [ Validators.required, Validators.minLength(6), Validators.pattern(/^[A-Z][a-z0-9]{5,20}$/)] ], 
    password        : [null, [ Validators.required, Validators.minLength(6), Validators.pattern(/^[A-Z][a-z0-9]{5,20}$/)] ], 
    rePassword      : [null, [ ]], 
  }, {validators:[this.rePasswordValidation]});

  rePasswordValidation(group:FormGroup):void {
    let password   = group.get('password');
    let rePassword = group.get('rePassword');

    if(rePassword?.value == null || rePassword?.value == ''){
      rePassword?.setErrors({required: true})
    } else if(password?.value != rePassword?.value) {
      rePassword?.setErrors({misMatch: true})
    }
  }

  handleUpdatePasswordForm():void {
    if(this.UpdatePasswordForm.valid) {
      let newpasswordForm = this.UpdatePasswordForm.value;
      this._AuthService.updatePAssword(newpasswordForm).subscribe({
        next: res => {
          console.log(res);
          this._ToastrService.success("Password Updated","FreshCart");
          if (res.token) {
            localStorage.setItem('userToken',res.token);
            this._Router.navigate(['/home']);
          }
        },
        error: err => {
          console.log(err);
          this._ToastrService.error(err.error.message,"FreshCart");
        }
      })
        }
    }
}