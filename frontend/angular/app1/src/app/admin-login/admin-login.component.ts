import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

  email=""
  password=""

  httpClient:HttpClient

  constructor(httpClient:HttpClient) {
    this.httpClient=httpClient
   }

  ngOnInit(): void {
  }

  onLogin()
  {
    const body = {
      email:this.email,
      password:this.password
    }

    const url='http://localhost:3000/admin/signin'
    const request=this.httpClient.post(url,body)
    request.subscribe(response =>
      {
        console.log(response)
      })
  }


}
