import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EventService } from './../event.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {

  events = []
 // event = 0;
  constructor(
    private router:Router,
    private eventservice:EventService,
    private modalService: NgbModal,
    private toastr: ToastrService
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
        else{
          console.log(response['error'])
        }
      })
  }
    uploadImage(event) {
    this.router.navigate(['/dashboard/event/upload-image'], {queryParams: {eventId: event['eventId']}})
  }
}
