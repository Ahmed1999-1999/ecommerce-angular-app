import { Product, Category } from './../../shared/interfaces/product';
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { EcomdataService } from 'src/app/shared/services/ecomdata.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from 'src/app/shared/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from 'src/app/shared/services/wishlist.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(
    private _EcomdataService:EcomdataService, 
    private _CartService:CartService,
    private _ToastrService:ToastrService,
    private _WishlistService:WishlistService) {}

  products:any[] = [];
  searchTerm:string = '';
  categories:any[] = [];
  productsInWishlist:string[] = [];

  // productsID:any[] = [];

  // For Sliders
  categoriesSlides: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 400,
    autoplay:true,
    autoplayTimeout:1500,
    autoplaySpeed:900,
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 7
      }
    },
    nav: false
  }
  mainSlides: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 400,
    autoplay:true,
    autoplayTimeout:1500,
    autoplaySpeed:900,
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 1
      },
      940: {
        items: 1
      }
    },
    nav: false
  }

  // To retrieve data from backend service once the component is initialized.
  ngOnInit(): void {
    // Products
    this._EcomdataService.getAllProducts().subscribe({
      next: res => {
        this.products = res.data;
        
      }
    })

    // Categories
    this._EcomdataService.getAllCategories().subscribe({
      next: res => {
        this.categories = res.data;
        
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
}