import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PaymentComponent } from './../payment/payment.component';
import { Component, OnInit } from '@angular/core';
import { CartService } from './../cart.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  items = []
  totalAmount = 0

  constructor(
    private toastr: ToastrService,
    private cartService: CartService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.loadCartItems()
  }

  amount() {
    this.cartService
    .amount()
    .subscribe(response => {
      if (response['status'] == 'success') {
        this.items=response['data']
        this.loadCartItems()
      }
    })
  }

  loadCartItems() {
    this.cartService
    .getCartItems()
    .subscribe(response => 
      {
        if(response['status']=='success')
        {
          this.items=response['data']
          this.totalAmount = 0
          for (let index = 0; index < this.items.length; index++) {
            const item = this.items[index];
            this.totalAmount += parseFloat(item['totalAmount'])
          }
        }
        else{
          console.log(response['error'])
        }
      })
  }

  onDelete(item) {
    this.cartService
      .deleteCartItem(item['registrationId'])
      .subscribe(response => {
        if (response['status'] == 'success') {
          this.toastr.error('Deleted cart item')
          this.loadCartItems()
        }
      })
  }
  
  updateQuantity(quantity, item) {
    const newQuantity = item['quantity'] + quantity
    if (newQuantity == 0) {
      this.onDelete(item)
    } else {
      this.cartService
        .updateCartItem(item['registrationId'], newQuantity, item['paymentAmount'])
        .subscribe(response => {
          if (response['status'] == 'success') {
            this.toastr.success('Quantity Updated')
            this.loadCartItems()
          }
        })
    }
  }

  payment() {
    this.modalService.open(PaymentComponent, {size : 'lg'})
  }
}