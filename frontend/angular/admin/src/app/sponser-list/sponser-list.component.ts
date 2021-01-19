import { SponserService } from './../sponser.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sponser-list',
  templateUrl: './sponser-list.component.html',
  styleUrls: ['./sponser-list.component.css']
})
export class SponserListComponent implements OnInit {

  sponsers = []

  constructor(
    private sponserservice:SponserService)
   { }

  ngOnInit(): void {
    this.loadSponser()
  }
  
  loadSponser()
  {
    this.sponserservice
    .getAllsponsers()
    .subscribe(response=>
      {
        if(response['status']=='success')
        {
          this.sponsers=response['data']
        }
      })
  }
}
