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
  events = [] 
  selectedFile = null
  event = 1;
  categories = [] 

  constructor(
    private router:Router,
    private eventService: EventService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.loadCategories()
  }

  onImageSelect(event) {
    this.selectedFile = event.target.files[0]
  }

  // onUploadImage(event) {
  //   const id = this.activatedRoute.snapshot.queryParams['id']
  //   this.eventService
  //     .uploadImage( id,this.selectedFile)
  //     .subscribe(response => {
  //       if (response['status'] == 'success') {

  //        this.toastr.success("added image")
  //        // this.router.navigate(['/dashboard/event/add-event'])
  //       } else {
  //         console.log(response['error'])
  //       }
  //     })
  // }

  onAddEvent() {
    this.eventService
      .addEvent(this.eventName, this.eventDescription, this.eventVenue, this.eventLocation, this.eventDate, this.eventTime,
                this.eventDuration, this.eventCategoryId, this.eventOrganizerId, this.eventImage, this.eventFee)
      .subscribe(response=>
      {
        if(response['status']=='success')
        {
          const data = response['data']

            this.toastr.success('Event Created Successfully')
            this.router.navigate(['/dashboard/event/event-list'])
        }else
        {
          this.toastr.error('Event Creation Failed')
        }
      })
  }

  // onUploadImage() {
  //   this.router.navigate(['/dashboard/event/upload-image'], {queryParams: {id: this.event['eventId']}})
  // }

  loadCategories() {
    this.eventService
      .getCategories()
      .subscribe(response => {
        if (response['status'] == 'success') {
          this.categories = response['data']
          this.categories.push({id: -1, title: 'All Categories'})
        }
      })
  }
}
