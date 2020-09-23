import { AdminService } from './../admin.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-organiserdata',
  templateUrl: './admin-organiserdata.component.html',
  styleUrls: ['./admin-organiserdata.component.css']
})
export class AdminOrganiserdataComponent implements OnInit {

  adminservice:AdminService

  organizers=[]
  
  constructor(adminservice:AdminService) {
    this.adminservice=adminservice
   }

  ngOnInit(): void {
  }

  loadOrganizer()
  {
    const request= this.adminservice.getAllorganizer()
   request.subscribe(response =>
    {
      if(response['status']=='success')
      {
      this.organizers= response['data']
      }
      else('error while loading list of users')
    })
  }

}
