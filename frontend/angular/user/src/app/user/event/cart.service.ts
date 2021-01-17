import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  url = 'http://localhost:4000/user/registerevent'

  constructor(
    private httpClient: HttpClient
  ) { }

  amount(){
    const httpOption = {
      headers :new HttpHeaders ({
        token : sessionStorage['token']
      })
    };
    return this.httpClient.get(this.url + "/",httpOption)
  }

  getCartItems() {
    // add the token in the request header
    const httpOptions = {
      headers: new HttpHeaders ({
        token: sessionStorage['token']
     })
    };
   
    return this.httpClient.get(this.url + "/user", httpOptions)
  }

  addCartItems(eventId, eventFee, quantity) {
    // add the token in the request header
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
    // add the token in the request header
    const httpOptions = {
      headers: new HttpHeaders({
        token: sessionStorage['token']
      })
    };

    return this.httpClient.delete(this.url + "/" + registrationId, httpOptions)
  }

  updateCartItem(id, quantity, paymentAmount) {
    // add the token in the request header
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