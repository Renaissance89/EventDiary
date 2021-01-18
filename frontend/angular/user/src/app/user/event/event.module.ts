import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventRoutingModule } from './event-routing.module';
import { EventListComponent } from './event-list/event-list.component';
import { CartComponent } from './cart/cart.component';
import { PaymentComponent } from './payment/payment.component';

@NgModule({
  declarations: [EventListComponent, CartComponent, PaymentComponent],
  imports: [
    CommonModule,
    EventRoutingModule
  ]
})
export class EventModule { }
