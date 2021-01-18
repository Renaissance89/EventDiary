import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EventService } from './../event.service';
import { CartService } from './../cart.service';
import { CartComponent } from '../cart/cart.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {

  events =[]
  allEvents = []
  categories = []

  constructor(
    private eventservice:EventService,
    private cartService: CartService,
    private modalService: NgbModal,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.loadevents()
    this.loadCategories()
  }
  filterProducts(event) {
    console.log("inside event")
    const categoryId1 = event.target.value
    console.log(categoryId1)
    this.events = []
    if (categoryId1 == -1) {
      this.events = this.allEvents
    } else {
      console.log("inside else")
      console.log(categoryId1)
      this.events = this.allEvents.filter(event => {
        return event.category['eventcategoryId'] == categoryId1
      })
    }
  }
  loadCategories() {
    this.eventservice
      .getCategories()
      .subscribe(response => {
        if (response['status'] == 'success') {
          this.categories = response['data']
          this.categories.push({id: -1, title: 'All Categories'})
         // console.log(this.categories)
        }
      })
  }
  loadCart() {
    this.modalService.open(CartComponent, { size: 'lg'})
  }

  loadevents() {
    this.eventservice
      .getAllevents()
      .subscribe(response=> {
        if(response['status']=='success')
        {
          this.events=response['data']
        }
        else{
          console.log(response['error'])
        }
      })
  }

  addToCart(event) {
    this.cartService
      .addCartItems(event['eventId'], event['eventFee'], 1)
      .subscribe(Response => {
        if (Response['status'] == 'success') {
          console.log('success')
          console.log('fail')
          this.toastr.success(event['eventName'] + ' added to cart')
        }
      })
  }
}
