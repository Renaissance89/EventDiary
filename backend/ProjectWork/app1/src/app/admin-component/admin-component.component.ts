import { AdminService } from '../admin.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-component',
  templateUrl: './admin-component.component.html',
  styleUrls: ['./admin-component.component.css']
})
export class AdminComponentComponent implements OnInit {

adminservice:AdminService

  users=[
  //   {
  //     "id": 2,
  //     "firstName": "aditya",
  //     "lastName": "awalkar",
  //     "email": "aditya@test.com",
  //     "password": "test1",
  //     "phone": "478752462",
  //     "city": "chennai",
  //     "state": "maharashtra",
  //     "gender": "Male",
  //     "role": "user",
  //     "active": 0,
  //     "activationToken": null,
  //     "createdOn": "2020-09-18T14:41:43.000Z"
  // },
  // {
  //     "id": 5,
  //     "firstName": "adwait",
  //     "lastName": "patil",
  //     "email": "adwait@test.com",
  //     "password": "test",
  //     "phone": "614543532",
  //     "city": "sangli",
  //     "state": "maharashtra",
  //     "gender": "Male",
  //     "role": "user",
  //     "active": 0,
  //     "activationToken": null,
  //     "createdOn": "2020-09-18T14:41:43.000Z"
  // },
  // {
  //     "id": 7,
  //     "firstName": "sachin",
  //     "lastName": "raut",
  //     "email": "sachin@test.com",
  //     "password": "test1",
  //     "phone": "478752462",
  //     "city": "koge",
  //     "state": "maharashtra",
  //     "gender": "Male",
  //     "role": "user",
  //     "active": 0,
  //     "activationToken": null,
  //     "createdOn": "2020-09-20T10:36:37.000Z"
  // }
]


  

  constructor(adminservice:AdminService) { 
    this.adminservice=adminservice
  }

  ngOnInit(): void {
  }

  loadUsers()
  {
   const request= this.adminservice.getAlluser()
   request.subscribe(response =>
    {
      if(response['status']=='success')
      {
      this.users= response['data']
      }
      else('error while loading list of users')
    })
  }
 
}
