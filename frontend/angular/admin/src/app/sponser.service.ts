import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SponserService {

  url='http://localhost:3000/sponser'
  constructor(private httpclient:HttpClient) { }

  getAllsponsers()
{
  const httpOptions={
headers:new HttpHeaders({
  token:sessionStorage['token']
})
  }
return this.httpclient.get(this.url+'/getAllSponser',httpOptions)
}
}
