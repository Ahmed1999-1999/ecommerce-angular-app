import { Userdata } from './../interfaces/userdata';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _HttpClient:HttpClient, private _Router:Router) { }
  
  userData:any;
  headers:any = {token: localStorage.getItem('userToken')};

  logOut():void {
    localStorage.removeItem('userToken');
    this._Router.navigate(['/login'])
  };

  saveUserData() {
    if (localStorage.getItem('userToken') != null ) {
      let encodeToken:any = localStorage.getItem('userToken');
      let decodeToken = jwtDecode(encodeToken);
      this.userData = decodeToken;
    }
  };

  setRegister(userData :object): Observable <any> {
    return this._HttpClient.post('https://ecommerce.routemisr.com/api/v1/auth/signup', userData)
  };

  setLogin(userData :object): Observable <any> {
    return this._HttpClient.post('https://ecommerce.routemisr.com/api/v1/auth/signin', userData)
  };

  // Settings Methods
  /// Forget Password
  forgetPassword(userData :object): Observable<any> {
    return this._HttpClient.post('https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords', userData)
  }
  /// Reset Code
  resetCode(code:object): Observable <any> {
    return this._HttpClient.post('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode', code)
  }
  /// Reset Password
  resetPassword(userData:object): Observable <any> {
    return this._HttpClient.put('https://ecommerce.routemisr.com/api/v1/auth/resetPassword', userData)
  }

  /// Update Password
  updatePAssword(passwordForm:object): Observable <any> {
    return this._HttpClient.put(
      'https://ecommerce.routemisr.com/api/v1/users/changeMyPassword',
      passwordForm,
      {
        headers: this.headers
      }
    )
  }
}
