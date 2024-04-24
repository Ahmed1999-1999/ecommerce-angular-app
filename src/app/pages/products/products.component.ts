import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/shared/services/cart.service';
import { ProductsService } from 'src/app/shared/services/products.service';
import { WishlistService } from 'src/app/shared/services/wishlist.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  constructor(
    private _ProductsService:ProductsService,
    private _CartService:CartService,
    private _WishlistService:WishlistService,
    private _ToastrService:ToastrService,
  ) {}

  products:any[] = [];
  searchTerm:string = '';
  categories:any[] = [];
  productsInWishlist:string[] = [];
  pageSize:number = 0;
  page    :string = '1';
  total   :number = 0;


    ngOnInit(): void {
      // Products
      this._ProductsService.getAllProducts(this.page).subscribe({
        next: res => {
          this.products = res.data;
          this.pageSize = res.metadata.limit;
          this.page     = res.metadata.currentPage;
          localStorage.setItem('page', this.page)
          this.total    = res.results;
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


  pageChanged(e:any):void {
    this._ProductsService.getAllProducts(e).subscribe({
      next: res => {
        this.products = res.data;
        this.pageSize = res.metadata.limit;
        this.page     = res.metadata.currentPage;
        this.total    = res.results;
        // Scroll Top Page
        window.scroll({ 
          top: 0, 
          left: 0, 
          behavior: 'smooth' 
        });
      }
    })
  }
}