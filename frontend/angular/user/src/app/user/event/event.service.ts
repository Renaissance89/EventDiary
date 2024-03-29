import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  url='http://localhost:4000/user/event'

  constructor(
    private httpclient:HttpClient
  ) { }

  getAllevents() {
    const httpOptions={
      headers:new HttpHeaders({
        token:sessionStorage['token']
      })
    }
    return this.httpclient.get(this.url+'/all', httpOptions)
  }

  addCartItems(eventId, eventFee, quantity){
    const httpOptions = {
      headers: new HttpHeaders({
        token: sessionStorage['token']
      })
    };

    const body = {
      eventId : eventId,
      eventFee : eventFee,
      quantity : quantity
    }
    return this.httpclient.post(this.url + "/register", body, httpOptions)
  }

  url1 = 'http://localhost:4000/category'

  getCategories() {
    const httpOptions = {
     headers: new HttpHeaders({
       token: sessionStorage['token']
     })
   };
   
    return this.httpclient.get(this.url1, httpOptions)
  }
}