import { Component, OnInit } from '@angular/core';
import { OdashboardService } from './../odashboard.service';

@Component({
  selector: 'app-odashboard',
  templateUrl: './odashboard.component.html',
  styleUrls: ['./odashboard.component.css']
})
export class OdashboardComponent implements OnInit {

  eventCount = ''
  eventCountTotal = ''
  userCount = ''

  constructor(
    private dashboardService: OdashboardService
  ) { }

  ngOnInit(): void {
    this.getActiveEvents()
    this.getTotalEvents()
    this.getTotalUsers()
  }

  getActiveEvents() {
    this.dashboardService
    .getActiveEvent()
    .subscribe(response=>
    {
      if(response['status']=='success')
      {
        this.eventCount = response['data'][0]['Event_Count']
      }
    })
  }

  getTotalEvents(){
    this.dashboardService
    .getTotalEvent()
    .subscribe(response=>
    {
      if(response['status']=='success')
      {
        this.eventCountTotal = response['data'][0]['Event_Count']
      }
    })
  }

  getTotalUsers(){
    this.dashboardService
    .getTotalUsers()
    .subscribe(response=>
    {
      if(response['status']=='success')
      {
        this.userCount = response['data'][0]['User_Count']
      }
    })
  }
}
