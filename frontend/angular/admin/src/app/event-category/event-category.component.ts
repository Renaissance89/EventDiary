import { EventCategoryService } from './../event-category.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient,HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-event-category',
  templateUrl: './event-category.component.html',
  styleUrls: ['./event-category.component.css']
})
export class EventCategoryComponent implements OnInit {

  categories = []

  constructor(
    private router:Router,
<<<<<<< Updated upstream
    private eventcategoryservice: EventCategoryService) { }

=======
    private eventcategoryservice: EventCategoryService,
    private httpClient:HttpClient
  ) { }
  url='http://localhost:3000/category'
>>>>>>> Stashed changes
  ngOnInit(): void {
    this.loadCategory()
  }

  loadCategory() {
    this.eventcategoryservice
      .getAllCategory()
      .subscribe(response=>
      {
        if(response['status']=='success')
        {
          this.categories=response['data']
        }
        else {
          console.log(response['error'])
        }
      })
<<<<<<< Updated upstream
=======
    }

    addCategory()
    {
      this.router.navigate(['/category-add'])

    }
    onEditCategory(category)
    {
this.router.navigate(['/category-add'],{queryParams:{categoryId:category['categoryId']}})
    }

    onDeleteCategory(id){
      this.router.
  
    }


>>>>>>> Stashed changes
  }

  addCategory() {
    this.router.navigate(['/category-add'])
  }

  editCategory(category)
  {
    this.router.navigate(['/category-add'],{queryParams:{categoryId:category['categoryId']}})
  }

  deleteCategory(category)
  {
    this.eventcategoryservice
      .removeCategory(category['categoryId'])
      .subscribe(response => {
        if(response['status']=='success')
        {
          this.categories=response['data']
          this.loadCategory()
        }
        // else {
        //   console.log(response['error'])
        // }
      })
  }
}
