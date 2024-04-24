import { CheckoutService } from 'src/app/shared/services/checkout.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-allorders',
  templateUrl: './allorders.component.html',
  styleUrls: ['./allorders.component.css']
})
export class AllordersComponent implements OnInit {
  constructor( private _CheckoutService:CheckoutService ) {}

    orders:any[] = [];
    allCarts:any[] = [];
    cartItems:any[] = [];
    arrayOfItemsPrice:any[] = [];
    arrayOIP:any[] = [];

  ngOnInit(): void {
    this._CheckoutService.saveUserData()
    this._CheckoutService.userOrders(this._CheckoutService.userId).subscribe({
      next: res => {
        this.orders = res
        let arrayOfItems = this.orders.map((item:any) => {
          this.cartItems.push(item.cartItems)
          })
          // Product Price
          this.cartItems.map((item:any) => {
            item.map((product:any) => {
              this.arrayOfItemsPrice.push(product.price)
            })
          })
      },
      error: err => {
        console.log(err);
      },
    })
  }
  
  getId():void {
    this._CheckoutService.saveUserData()
    this._CheckoutService.userOrders(this._CheckoutService.userId).subscribe({
      next: res => {
        let cartt = res.reduce((accumulator:any, item:any) => {
          this.orders.push(item)
        }, {})
      },
      error: err => {
        console.log(err);
      },
    })





    // const groupedItems = items.reduce((accumulator, item) => {
    //   console.log(item);
      
    // }, {})
    
  }
}