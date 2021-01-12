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
  
  updateCategory(categoryId, categoryName: string, categoryDescription: string)
  {
    // add the token in the request header
    const httpOptions = {
        headers: new HttpHeaders({
        token: sessionStorage['token']
      })
    };

    const body = {
      categoryName: categoryName,
      categoryDescription: categoryDescription
    }

    return this.httpClient.put(this.url + "/updateCategory/" + categoryId, body, httpOptions)
  }

  insertCategory(categoryName: string, categoryDescription: string) 
  {
    // add the token in the request header
    const httpOptions = {
      headers: new HttpHeaders({
        token: sessionStorage['token']
      })
    };

    const body = {
      categoryName: categoryName,
      categoryDescription: categoryDescription
    }

    return this.httpClient.post(this.url + "/addCategory", body, httpOptions)
  }

  getCategoryDetails(categoryId) {
    // add the token in the request header
    const httpOptions = {
     headers: new HttpHeaders({
       token: sessionStorage['token']
     })
   };
   
   return this.httpClient.get(this.url + "/getCategorybyId/" + categoryId, httpOptions)
  }

  removeCategory(categoryId) 
  {
    // add the token in the request header
    const httpOptions = {
      headers: new HttpHeaders({
        token: sessionStorage['token']
      })
    };

    return this.httpClient.delete(this.url + "/deleteCategory/" + categoryId, httpOptions)
  }
}