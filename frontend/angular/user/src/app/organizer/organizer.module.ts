import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrganizerRoutingModule } from './organizer-routing.module';
import { EventComponent } from './event/event.component';
import { UploadImageComponent } from './event/upload-image/upload-image.component';


@NgModule({
  declarations: [EventComponent, UploadImageComponent],
  imports: [
    CommonModule,
    OrganizerRoutingModule
  ]
})
export class OrganizerModule { }