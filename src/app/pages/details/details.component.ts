import { Product } from './../../shared/interfaces/product';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EcomdataService } from 'src/app/shared/services/ecomdata.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from 'src/app/shared/services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  constructor(
    private _ActivatedRoute:ActivatedRoute,
    private _EcomdataService:EcomdataService,
    private _CartService:CartService,
    private _ToastrService:ToastrService) {}

  productId:any = '';
  productDetails:Product = {} as Product;

  productSlides: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 400,
    autoplay: false,
    items: 1,
    nav: false
  }

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: param => {
        this.productId =param.get('id');
        this._EcomdataService.getProductDetails(this.productId).subscribe({
          next: res => {
            this.productDetails = res.data;
          }
        })
      }
    })
  }

    // Add To Cart
    addProductToCart(id:string):void {
      this._CartService.addToCart(id).subscribe({
        next: res => {
          this._ToastrService.success(res.message);
        },
        error: err => {
          console.log(err);
          
        }
      })
    }

}