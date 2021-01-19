import { EventCategoryService } from './../event-category.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-event-category',
  templateUrl: './event-category.component.html',
  styleUrls: ['./event-category.component.css']
})
export class EventCategoryComponent implements OnInit {

  categories = []

  constructor(
    private router:Router,
    private eventcategoryservice: EventCategoryService) { }

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
  }

  addCategory() 
  {
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
          this.categories = response['data']
          this.loadCategory()
        }
      })
  }
}