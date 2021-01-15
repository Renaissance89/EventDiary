import { DashboardService } from './../dashboard.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  eventCount=[]
  userCount=[]
  organizerCount=[];
  sponserCount=[]

  constructor(
    private dashboardService: DashboardService) 
    { }

  ngOnInit(): void {
    this.getActiveEvents();
    this.getTotalUsers();
    this.getTotalOrganizers();
    this.getTotalSponsers();
  }

  getActiveEvents() {
    this.dashboardService
    .getActiveEvent()
    .subscribe(response=>
    {
      if(response['status']=='success')
      {
        this.eventCount = response['data']
        console.log(this.eventCount);
      }
      else{
        console.log(response['error'])
      }
    })
  }

  getTotalUsers() {
    this.dashboardService
    .getUser()
    .subscribe(response=>
    {
      if(response['status']=='success')
      {
        this.userCount = response['data']
        console.log(this.userCount);
      }
      else{
        console.log(response['error'])
      }
    })
  }

  getTotalOrganizers() {
    this.dashboardService
    .getOrganizer()
    .subscribe(response=>
    {
      if(response['status']=='success')
      {
        this.organizerCount = response['data']
        console.log(this.organizerCount);
      }
      else{
        console.log(response['error'])
      }
    })
  }
  
  getTotalSponsers() {
    this.dashboardService
    .getSponser()
    .subscribe(response=>
    {
      if(response['status']=='success')
      {
        this.sponserCount = response['data']
        console.log(this.sponserCount);
      }
      else{
        console.log(response['error'])
      }
    })
  }
}
