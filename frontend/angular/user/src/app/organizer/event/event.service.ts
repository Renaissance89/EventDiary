import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  url = 'http://localhost:4000/organizer/event'

  constructor(
    private router: Router,
    private httpClient: HttpClient
  ) { }

  addEvent(eventName: string, eventDescription: string , eventVenue: string, eventLocation: string, eventDate: string, 
    eventTime: string, eventDuration: string, eventCategoryId, eventOrganizerId, eventImage: string, eventFee: string) {
      // add the token in the request header
      const httpOptions = {
          headers: new HttpHeaders({
          token: sessionStorage['token']
        })
      };

      const body = {
        eventName : eventName,
        eventDescription : eventDescription,
        eventVenue : eventVenue,
        eventLocation : eventLocation,
        eventDate : eventDate,
        eventTime : eventTime,
        eventDuration : eventDuration,
        eventCategoryId : eventCategoryId,
        eventImage : eventImage,
        eventFee : eventFee
      }

    return this.httpClient.post(this.url + '/addEvent/' + eventOrganizerId , body, httpOptions)
  }
  uploadImage(id, file) {
    // add the token in the request header
    const httpOptions = {
      headers: new HttpHeaders({
        token: sessionStorage['token']
      })
    };

    const body = new FormData()
    body.append('eventImage', file)

    return this.httpClient.post(this.url + `/upload-image/${id}`, body, httpOptions)
  }
}
