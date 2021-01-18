import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OdashboardService {

  url='http://localhost:4000/organizer/dashboard'
  constructor(
    private httpClient:HttpClient)
  { }

  getActiveEvent()
  {
    const httpOptions={
        headers:new HttpHeaders({
        token:sessionStorage['token']
      })
    }
    return this.httpClient.get(this.url+'/getActiveEventCount',httpOptions)
  }

}
