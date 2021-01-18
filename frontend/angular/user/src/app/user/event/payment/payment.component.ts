import { CartService } from './../cart.service';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  items = []
  totalAmount = 0

  constructor(
    private toastr: ToastrService,
    private modalService: NgbModal,
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    this.loadCartItems()
  }

  amount() {
    this.cartService
    .amount()
    .subscribe(response => {
      if (response['status'] == 'success') {
        // this.toastr.warning('Deleted cart item')
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

  placeOrder() {
    this.toastr.success('Payment Done Successfully')
    this.modalService.dismissAll()
  }
}
