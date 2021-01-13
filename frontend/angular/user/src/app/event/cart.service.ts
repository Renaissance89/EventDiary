import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  url = 'http://localhost:4000/registerevent'

  constructor(
    private httpClient: HttpClient) { }
  
  getCartItems() {
     // add the token in the request header
     const httpOptions = {
      headers: new HttpHeaders({
        token: sessionStorage['token']
      })
    };
    
    return this.httpClient.get(this.url + "/register", httpOptions)
  }

  addCartItems(eventId,paymentAmount,quantity){
        // add the token in the request header
        const httpOptions = {
          headers: new HttpHeaders({
            token: sessionStorage['token']
          })
        };

        const body = {
          eventId: eventId,
          paymentAmount : paymentAmount,
          quantity : quantity
        }
        return this.httpClient.post(this.url + "/register", body, httpOptions)
  }

}
