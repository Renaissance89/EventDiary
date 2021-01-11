import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EventCategoryService {

  url='http://localhost:3000/category'

  constructor(
    private httpClient:HttpClient
  ) { }

  getAllCategory()
  {
    const httpOptions={
      headers:new HttpHeaders({
        token:sessionStorage['token']
      })
    }
return this.httpClient.get(this.url+'/getAllCategory',httpOptions)
  }
  
updateCategory(categoryName:string)
  
  {
    const httpOptions={
      headers:new HttpHeaders({
        token:sessionStorage['token']
      })
    }
    const body={
      categoryName:categoryName
    }

return this.httpClient.put(this.url+'/updateCategory'+ body,httpOptions)

  }
}
