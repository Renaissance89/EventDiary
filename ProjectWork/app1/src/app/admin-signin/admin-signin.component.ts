import { Component, OnInit } from '@angular/core';
import { AdminService } from './../admin.service';
@Component({
  selector: 'app-admin-signin',
  templateUrl: './admin-signin.component.html',
  styleUrls: ['./admin-signin.component.css']
})
export class AdminSigninComponent implements OnInit {
  email = ''
  password = ''

  adminservice:AdminService
  constructor(adminservice:AdminService) {
    this.adminservice=adminservice
   }

  ngOnInit(): void {
  }

  onCancel() {

  }

  onLogin() {
    // console.log(`email = ${this.email}`)
    // console.log(`password = ${this.password}`)

    const request= this.adminservice.adminLogin()
   request.subscribe(response =>
    {
      if(response['status']=='success')
      {
      this.adminservice= response['data']
      }
      else('error while signin')
    })
  }
}


