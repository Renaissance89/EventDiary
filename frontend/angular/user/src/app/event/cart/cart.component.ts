import { Component, OnInit } from '@angular/core';
import { CartService } from './../cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  items = []

  constructor(
    //private toastr: ToastrService,
    private cartService: CartService) { }

  ngOnInit(): void {
    this.loadCartItems()
  }
  
  loadCartItems(){
    this.cartService
    .getCartItems()
    .subscribe(Response => { 
      if (Response['status'] == 'success') {
        this.items = Response['data']
        // this.totalAmount = 0
        // for (let index = 0; index < this.items.length; index++) {
        //   const item = this.items[index];
        //   this.totalAmount += parseFloat(item['totalAmount'])
        // }
      }
    })
  }

}
