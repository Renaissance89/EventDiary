import { Component, OnInit } from '@angular/core';
import { EventService } from './../event.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {

  events = []

  constructor(
    private router:Router,
    private eventservice:EventService
  ) { }

  ngOnInit(): void {
    this.loadevents()
  }

  loadevents() {
    this.eventservice
      .getAllevents()
      .subscribe(response=> {
        if(response['status']=='success')
        {
          this.events=response['data']
        }
      })
  }

  uploadImage(event) {
    this.router.navigate(['/dashboard/event/upload-image'], {queryParams: {eventId: event['eventId']}})
  }

  onAddEvent() {
    this.router.navigate(['/dashboard/event/add-event'])
  }
}
