import { Product } from './../../shared/interfaces/product';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/shared/services/cart.service';
import { WishlistService } from 'src/app/shared/services/wishlist.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {
  constructor(
    private _WishlistService:WishlistService,
    private _CartService:CartService,
    private _ToastrService:ToastrService
) {}

  products:any[] = [];
  productsInWishlist:string[] = [];

  ngOnInit(): void {
    // Get User Wishlist
    this._WishlistService.getUserWishlist().subscribe({
      next: res => {
        this.products = res.data
      },
      error(err) {
        console.log(err);
        
      },
    })
  }

  // Add To Cart
  addProductToCart(id:string):void {
    this._CartService.addToCart(id).subscribe({
      next: res => {
        this._ToastrService.success(res.message,"FreshCart")
      },
      error: err => {
        console.log(err);
      }
    })
  }

  // Remove Fromm Wishlist
  removeFromWishlist(productId:any):void {
    this._WishlistService.removeFromWishlist(productId).subscribe({
      next: res => {
        this._ToastrService.error(res.message)
        this.productsInWishlist = res.data;
        let filteredData = this.products.filter( (product:any) => this.productsInWishlist.includes(product._id));
        this.products = filteredData;
      }
    })
  }
}