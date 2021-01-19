import { EventService } from './../event.service';

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {

  events = []
  
  constructor(private eventservice:EventService) { }

  ngOnInit(): void {
    this.loadevents()
  }

  loadevents() {
    this.eventservice
    .getAllevents()
    .subscribe(response=>
      {
        if(response['status']=='success')
        {
          this.events=response['data']

          // for (let index = 0; index < this.events.length; index++) {
          //   let date = new Date(response['data'][index]['Date'])
          //     console.log(date)
          //     var day = date.getDate();
          //     var month = date.getMonth() + 1;
          //     var year = date.getFullYear();
                        
          //     console.log(day)
          //     console.log(month)
          //     console.log(year)
          // }
        }
      })
  }

  toggleActive(event) {
    this.eventservice
    .toggleActiveStatus(event)
    .subscribe(response=>
      {
        if(response['status']=='success')
        {
          this.loadevents()
        }
      })
  }
}
