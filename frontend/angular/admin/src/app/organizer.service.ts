import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrganizerService {

  url='http://localhost:3000/organizer'
  constructor(private httpclient:HttpClient) { }

  getAllorganizers()
{
  const httpOptions={
headers:new HttpHeaders({
  token:sessionStorage['token']
})
  }
return this.httpclient.get(this.url+'/getAllorganizer',httpOptions)
}

toggleActiveStatus(organizer)
{
  const httpOptions={
    headers:new HttpHeaders({
      token:sessionStorage['token']
    })
  };
  const body={
    status:organizer['active']==1?0:1

  }
  return this.httpclient.put(this.url+"/toggle-active/"+ organizer['userId'],body,httpOptions)
}

}
