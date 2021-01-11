import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  url='http://localhost:3000/feedback'
  constructor(private httpclient:HttpClient) { }

  getAllfeedbacks()
  {
    const httpOptions={
      headers:new HttpHeaders({
        token:sessionStorage['token']
      })
        }
      return this.httpclient.get(this.url+'/getAllFeedback',httpOptions)
  }
}
