import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url='http://localhost:3000/user'
  constructor(private httpclient:HttpClient) { }

  getAllusers()
{
  const httpOptions={
headers:new HttpHeaders({
  token:sessionStorage['token']
})
  }
return this.httpclient.get(this.url+'/getAlluser',httpOptions)
}

toggleActiveStatus(user)
{
  const httpOptions={
    headers:new HttpHeaders({
      token:sessionStorage['token']
    })
  };
  const body={
    status:user['active']==1?0:1

  }
  return this.httpclient.put(this.url+"/toggle-active/"+ user['id'],body,httpOptions)
}

}
