import { Component, OnInit } from '@angular/core';
import { EventService } from './../event.service';
import { CartService } from './../cart.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CartComponent } from '../cart/cart.component';
import { ToastrService } from 'ngx-toastr';




@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {

  events =[]
  constructor(private eventservice:EventService,
    private cartService: CartService,
    private modalService: NgbModal,
    private toastr: ToastrService
    ) { }

  ngOnInit(): void {
    this.loadevents()
  }

  loadCart() {
    this.modalService.open(CartComponent, { size: 'lg'})
  }
  loadevents()
  {
    this.eventservice
    .getAllevents()
    .subscribe(response=>
      {
        if(response['status']=='success')
        {
          this.events=response['data']
        }
        else{
          console.log(response['error'])
        }
      })
  }

  addToCart(event){
    this.cartService
    .addCartItems(event['eventId'],event['eventFee'],1)
    .subscribe(Response => {
      if (Response['status'] == 'success') {
        console.log('success')
        console.log('fail')
        this.toastr.success('Product added to cart')
      }

    })
  }

}
