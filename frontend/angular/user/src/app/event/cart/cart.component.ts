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
    .subscribe(response => 
      {
        if(response['status']=='success')
        {
          this.items=response['data']
        }
        else{
          console.log(response['error'])
        }
      })
    }




}
