import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/shared/services/cart.service';
import { WishlistService } from 'src/app/shared/services/wishlist.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  constructor(
    private _CartService:CartService,
    private _WishlistService:WishlistService,
    private _ToastrService:ToastrService) {}

  products:any[] = [];
  totalPrice:string = '';
  cartID:string ='';
  productsInWishlist:string[] = [];

  // To retrieve data from backend service once the component is initialized.
  ngOnInit(): void {
    // Get User Cart
    this._CartService.getUserCart().subscribe({
      next: res => {
        
        this.cartID = res.data._id;     
        this.products = res.data.products;
        this.totalPrice = res.data.totalCartPrice;
      },
      error: err => {
        console.log(err);
        
      }
    })

    // Logged User Wishlist
    this._WishlistService.getUserWishlist().subscribe({
      next: res => {        
        let arrayOfIDs = res.data.map((item:any) => {
        this.productsInWishlist.push(item.id)
        })   
      },
    })
  }

  // Update Product in Cart
  changeProductCount(id:string, count:number): void {
    this._CartService.updateProducts(id, count).subscribe({
      next: res => {
        this.products = res.data.products;
        this.totalPrice = res.data.totalCartPrice;
        this._ToastrService.success("Product updated", "FreshCart");
      },
      error(err) {
        console.log(err);
      },
    })
  }

  // Delete Product from Cart
  deleteProduct(id:string): void {
    this._CartService.deleteProductFromCart(id).subscribe({
      next: res => {
        this.products = res.data.products;
        this._ToastrService.error("Product Removed", "FreshCart");
      },
      error: err => {
        console.log(err);
        
      }
    })
  }

  // Delete All Product in Cart
  deleteAllProducts(): void {
    this._CartService.deleteCart().subscribe({
      next: res => {
        this.products = [];        
        this.totalPrice = '$ 0';
        this._ToastrService.error("Your cart has been removed", "FreshCart");
      },
      error: err => {
        console.log(err);
        
      },
    })
  }

  // Wishlist Operations
  // Add to Wishlist
  addToWishlist(productId:any):void {
    this._WishlistService.addToWishlist(productId).subscribe({
      next: res => {
        this.productsInWishlist = res.data;
        this._ToastrService.success(res.message)
      }
    })
    
  }
  
  // Remove Fromm Wishlist
  removeFromWishlist(productId:any):void {
    this._WishlistService.removeFromWishlist(productId).subscribe({
      next: res => {
        this.productsInWishlist = res.data;
        this._ToastrService.error(res.message)
      }
    })
  }
}