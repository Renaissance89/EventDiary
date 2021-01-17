import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventRoutingModule } from './event-routing.module';
import { AddEventComponent } from './add-event/add-event.component';
import { EventListComponent } from './event-list/event-list.component';


@NgModule({
  declarations: [AddEventComponent, EventListComponent],
  imports: [
    CommonModule,
    EventRoutingModule,
    FormsModule
  ]
})
export class EventModule { }
