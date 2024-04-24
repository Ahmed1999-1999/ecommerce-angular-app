import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  constructor(private _HttpClient:HttpClient) { }

  // Add Products
  addToCart(productId:string): Observable<any> {
    return this._HttpClient.post
    ('https://ecommerce.routemisr.com/api/v1/cart', {productId: productId})
  };

  // Show Products
  getUserCart(): Observable<any> {
    return this._HttpClient.get('https://ecommerce.routemisr.com/api/v1/cart')
  };

  // Update Products
  updateProducts(id: string, count:number): Observable<any> {
    return this._HttpClient.put(
      `https://ecommerce.routemisr.com/api/v1/cart/${id}`, {"count": count})
  };

  // Delete Product
  deleteProductFromCart(id:string): Observable<any> {
    return this._HttpClient.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`)
  }

  // Delete All Products
  deleteCart(): Observable<any> {
  return this._HttpClient.delete('https://ecommerce.routemisr.com/api/v1/cart')
  }
}