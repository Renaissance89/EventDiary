import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class EventService {
  url='http://localhost:3000/event'
  constructor(private httpclient:HttpClient) { }


  getAllevents()
  {
    const httpOptions={
  headers:new HttpHeaders({
    token:sessionStorage['token']
  })
    }
  return this.httpclient.get(this.url+'/getAllevent',httpOptions)
  }
  
  toggleActiveStatus(event)
  {
    const httpOptions={
      headers:new HttpHeaders({
        token:sessionStorage['token']
      })
    };
    const body={
      status:event['active']==1?0:1
  
    }
    return this.httpclient.put(this.url+"/toggle-active/"+ event['eventId'],body,httpOptions)
  }
  
  }

