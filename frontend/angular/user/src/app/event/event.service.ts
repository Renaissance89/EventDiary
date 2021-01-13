import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  url='http://localhost:4000/event'
  constructor(private httpclient:HttpClient) { }



  getAllevents()
  {
    const httpOptions={
      headers:new HttpHeaders({
        token:sessionStorage['token']
      })
    }
    return this.httpclient.get(this.url+'/all',httpOptions)
  }
}