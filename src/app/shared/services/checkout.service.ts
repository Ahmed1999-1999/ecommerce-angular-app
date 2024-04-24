import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class CheckoutService {
  constructor(private _HttpClient: HttpClient) {}

  userData: any;
  userId: string = '';

  saveUserData() {
    if (localStorage.getItem('userToken') != null) {
      let encodeToken: any = localStorage.getItem('userToken');
      let decodeToken = jwtDecode(encodeToken);
      this.userData = decodeToken;
      this.userId = this.userData.id;
    }
  }
  // Online Payment
  checkout(cardID: string, userData: object): Observable<any> {
    return this._HttpClient.post(
      `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cardID}?url=https://ecommerce-angular-app.vercel.app/#/`,
      {
        shippingAddress: userData,
      }
    );
  }
  // All User Orders
  userOrders(id: string): Observable<any> {
    return this._HttpClient.get(
      `https://ecommerce.routemisr.com/api/v1/orders/user/${id}`
    );
  }
}
