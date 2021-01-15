import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  url='http://localhost:4000/user/event'
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
  addCartItems(eventId,eventFee,quantity){
    // add the token in the request header
    const httpOptions = {
      headers: new HttpHeaders({
        token: sessionStorage['token']
      })
    };

    const body = {
      eventId: eventId,
      eventFee : eventFee,
      quantity : quantity
    }
    return this.httpclient.post(this.url + "/register", body, httpOptions)
}
}
