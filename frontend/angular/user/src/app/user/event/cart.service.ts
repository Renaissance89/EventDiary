import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  url = 'http://localhost:4000/user/registerevent'
  url1='http://localhost:4000/user/event'


  constructor(
    private httpClient: HttpClient
  ) { }

  amount() {
    const httpOption = {
      headers :new HttpHeaders ({
        token : sessionStorage['token']
      })
    };
    return this.httpClient.get(this.url1 + "/", httpOption)
  }

  // getAllevents() {
    
  //   const httpOptions={
  //     headers:new HttpHeaders({
  //       token:sessionStorage['token']
  //     })
  //   }
  //   return this.httpClient.get(this.url+'/all', httpOptions)
  // }

  getCartItems() {
    const httpOptions = {
      headers: new HttpHeaders ({
        token: sessionStorage['token']
     })
    };
    return this.httpClient.get(this.url + "/user", httpOptions)
  }

  addCartItems(eventId, eventFee, quantity) {
    const httpOptions = {
      headers: new HttpHeaders({
        token: sessionStorage['token']
      })
    };

    const body = {
      eventId : eventId,
      paymentAmount : eventFee,
      quantity : quantity
    }

    return this.httpClient.post(this.url + "/user", body, httpOptions)
  }

  deleteCartItem(registrationId) {
    const httpOptions = {
      headers: new HttpHeaders({
        token: sessionStorage['token']
      })
    };

    return this.httpClient.delete(this.url + "/" + registrationId, httpOptions)
  }

  updateCartItem(id, quantity, paymentAmount) {
    const httpOptions = {
      headers: new HttpHeaders({
        token: sessionStorage['token']
      })
    };

    const body = {
      paymentAmount : paymentAmount, 
      quantity : quantity
    }

    return this.httpClient.put(this.url + "/" + id, body, httpOptions)
  }
}
