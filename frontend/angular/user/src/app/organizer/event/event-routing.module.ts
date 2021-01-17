import { EventListComponent } from './event-list/event-list.component';
import { AddEventComponent } from './add-event/add-event.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'add-event', component: AddEventComponent},
  { path: 'event-list', component: EventListComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventRoutingModule { }
