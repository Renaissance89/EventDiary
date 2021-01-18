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

  constructor(
    private dashboardService: OdashboardService
  ) { }

  ngOnInit(): void {
    this.getActiveEvents()
    this.getTotalEvents()
  }
  getActiveEvents() {
    this.dashboardService
    .getActiveEvent()
    .subscribe(response=>
    {
      if(response['status']=='success')
      {
        this.eventCount = response['data'][0]['Event_Count']
        console.log(this.eventCount);
      }
      else{
        console.log(response['error'])
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
        console.log(this.eventCountTotal);
      }
      else{
        console.log(response['error'])
      }
    })

  }
}
