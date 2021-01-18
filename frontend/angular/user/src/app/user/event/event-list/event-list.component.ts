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
  filterEvents(event) {
    console.log("inside event")
    const Id = event.target.value
    // console.log(categoryId)
    this.events = []
    // console.log(this.events)
    if (Id == -1) {
      this.events = this.allEvents
    } else {
      console.log("inside else")
      this.events = this.allEvents.filter(event => {
        return event.category['categoryId'] == Id
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
          this.allEvents = response['data']
          this.events = this.allEvents
         // this.events=response['data']
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
