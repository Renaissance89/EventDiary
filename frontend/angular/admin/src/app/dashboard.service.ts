import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  url='http://localhost:3000/dashboard'

  constructor(
    private httpClient:HttpClient)
  { }

  getOrganizer() {
      const httpOptions={
        headers:new HttpHeaders({
        token:sessionStorage['token']
      })
    }
    return this.httpClient.get(this.url + '/getOrganizerCount', httpOptions)
  }
     
  getActiveEvent() {
    const httpOptions={
        headers:new HttpHeaders({
        token:sessionStorage['token']
      })
    }
    return this.httpClient.get(this.url + '/getActiveEventCount', httpOptions)
  }

  getSponser() {
    const httpOptions={
        headers:new HttpHeaders({
        token:sessionStorage['token']
      })
    }
    return this.httpClient.get(this.url + '/getSponserCount', httpOptions)
  }

  getUser() {
    const httpOptions={
        headers:new HttpHeaders({
        token:sessionStorage['token']
      })
    }
    return this.httpClient.get(this.url + '/getUserCount', httpOptions)
  }
}