import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';


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
