import { CheckoutService } from './../../shared/services/checkout.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/shared/services/cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  constructor( 
    private _FormBuilder:FormBuilder,
    private _ActivatedRoute:ActivatedRoute,
    private _CheckoutService:CheckoutService) {}

  cartID:any = '';
  userData:object = {};

  // Making Form with FormBuilder
  checkoutForm: FormGroup = this._FormBuilder.group({
    details :[null, [ Validators.required] ],
    phone   :[null, [  Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)] ],
    city    :[null, [ Validators.required] ],
  })

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: param => {
        this.cartID =param.get('id');
      },
      error(err) {
        console.log(err);
      },
    })
  }

  handleForm():void {
    if(this.checkoutForm.valid) {
      this.userData = this.checkoutForm.value
      this._CheckoutService.checkout(this.cartID,this.userData).subscribe({
        next(res) {
          if (res.status == "success") {
            window.open(res.session.url, '_self')
          }
        },
        error(err) {
            console.log(err);
        },
      })
    }
  }
}