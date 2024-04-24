import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/shared/services/cart.service';
import { EcomdataService } from 'src/app/shared/services/ecomdata.service';
import { WishlistService } from 'src/app/shared/services/wishlist.service';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css']
})
export class BrandComponent implements OnInit {
  constructor(
    private _ActivatedRoute:ActivatedRoute,
    private _EcomdataService:EcomdataService,
    private _CartService:CartService,
    private _WishlistService:WishlistService,
    private _ToastrService:ToastrService
  ) {}

  brandName:any = '';
  brandId:any = '';
  products:any = {};
  productsInWishlist:string[] = [];

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: param => {
        this.brandId = param.get('id')
        this._EcomdataService.getSpecificBrand(this.brandId).subscribe({
          next: res => {
            this.brandName = res.data.name
          }
        })
      }
    })

    this._EcomdataService.getAllProducts().subscribe({
      next: res => {
        this.products = res.data
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