import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  constructor(private _HttpClient:HttpClient) { }

  // Add Product To Wishlist
  addToWishlist(productId:string): Observable<any> {
    return this._HttpClient.post
    ('https://ecommerce.routemisr.com/api/v1/wishlist', {productId: productId})
  };
  // Remove Product From Wishlist
  removeFromWishlist(id:string): Observable<any> {
    return this._HttpClient.delete
    (`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`)
  };
  // Show User Wishlist
  getUserWishlist(): Observable<any> {
    return this._HttpClient.get
    ('https://ecommerce.routemisr.com/api/v1/wishlist')
  }
}