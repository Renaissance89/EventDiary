import { Component, OnInit } from '@angular/core';
import { EventService } from './../event.service';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {

  events=[]
  constructor(private eventservice:EventService) { }

  ngOnInit(): void {
    this.loadevents()
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
}
