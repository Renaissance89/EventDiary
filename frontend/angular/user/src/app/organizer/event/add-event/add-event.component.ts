import { ToastrService } from 'ngx-toastr';
import { EventService } from './../../../organizer/event/event.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventComponent implements OnInit {

  eventName = ''
  eventDescription = ''
  eventVenue = ''
  eventLocation = ''
  eventDate = ''
  eventTime = ''
  eventDuration = ''
  eventCategoryId = ''
  eventOrganizerId = ''
  eventImage = ''
  eventFee = ''

  constructor(
    private router:Router,
    private eventService: EventService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
  }

  onAddEvent() {
    this.eventService
      .addEvent(this.eventName, this.eventDescription, this.eventVenue, this.eventLocation, this.eventDate, this.eventTime,
                this.eventDuration, this.eventCategoryId, this.eventOrganizerId, this.eventImage, this.eventFee)
      .subscribe(response=>
        {
          if(response['status']=='success')
          {
            const data = response['data']
              console.log(data)

              this.toastr.success('Event Created Successfully')
              this.router.navigate(['/dashboard'])
          }else
          {
            this.toastr.error('Event Creation Failed')
          }
        })
  }
}
