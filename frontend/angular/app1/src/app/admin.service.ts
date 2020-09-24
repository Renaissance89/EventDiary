import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  httpCLient:HttpClient

  constructor(
    httpClient:HttpClient
  ) 
  {  this.httpCLient=httpClient  }

  getAlluser()
  {
    const url="http://localhost:3000/user/getAllUser"
    const request= this.httpCLient.get(url)
    return request  
  }
  getAllorganizer()
  {
    const url="http://localhost:3000/organizer/getAllOrganizer"
    const request= this.httpCLient.get(url)
    return request  
  }



}
