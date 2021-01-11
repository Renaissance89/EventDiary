import { OrganizerService } from './../organizer.service';
import { AdminService } from './../admin.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-organizer-list',
  templateUrl: './organizer-list.component.html',
  styleUrls: ['./organizer-list.component.css']
})
export class OrganizerListComponent implements OnInit {

  organizers=[]
  constructor(private organizerservice:OrganizerService) {

   }

  ngOnInit(): void {
    this.loadorganizers()
  }

  loadorganizers()
  {
    this.organizerservice
    .getAllorganizers()
    .subscribe(response=>
      {
        if(response['status']=='success')
        {
          this.organizers=response['data']
        }
        else{
          console.log(response['error'])
        }
      })
  }
  toggleActive(organizer)
  {
    this.organizerservice
    .toggleActiveStatus(organizer)
    .subscribe(response=>
      {
        if(response['status']=='success')
        {
          this.loadorganizers()
        }
        else{
          console.log(response['error'])
        }
        
      })

  }

}
