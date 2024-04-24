import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HttpRequestHeaderInterceptor implements HttpInterceptor {
  constructor() {}

  userToken:any = {token: localStorage.getItem('userToken')}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    if (
      request.url !== 'https://ecommerce.routemisr.com/api/v1/auth/signup' &&
      request.url !== 'https://ecommerce.routemisr.com/api/v1/auth/signin' &&
      request.url !== 'https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords'&&
      request.url !== 'https://ecommerce.routemisr.com/api/v1/users/changeMyPassword'
      ) {
      request = request.clone({
        setHeaders: this.userToken
      })
    }

    return next.handle(request);
  }
}