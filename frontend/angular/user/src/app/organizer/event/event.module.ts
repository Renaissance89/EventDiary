import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventRoutingModule } from './event-routing.module';
import { AddEventComponent } from './add-event/add-event.component';
import { EventListComponent } from './event-list/event-list.component';
import { UploadImageComponent } from './upload-image/upload-image.component';


@NgModule({
  declarations: [AddEventComponent, EventListComponent, UploadImageComponent],
  imports: [
    CommonModule,
    EventRoutingModule,
    FormsModule
  ]
})
export class EventModule { }
