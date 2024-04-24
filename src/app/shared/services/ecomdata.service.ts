import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EcomdataService {
  constructor(private _HttpClient:HttpClient) { }

  // Products
  getAllProducts(): Observable<any> {
    return this._HttpClient.get('https://ecommerce.routemisr.com/api/v1/products')
  }
  getProductDetails(id:string): Observable<any> {
    return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
  }
  // Categories
  getAllCategories(): Observable<any> {
    return this._HttpClient.get('https://ecommerce.routemisr.com/api/v1/categories')
  }
  getSpecificCategory(id:string): Observable <any> {
    return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/categories/${id}`)
  }
  // Brands
  getAllBrands(): Observable<any> {
    return this._HttpClient.get('https://ecommerce.routemisr.com/api/v1/brands')
  }
  getSpecificBrand(id:string): Observable<any> {
    return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/brands/${id}`)
  }
}