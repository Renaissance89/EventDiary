import { EventCategoryService } from './../event-category.service';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category-add',
  templateUrl: './category-add.component.html',
  styleUrls: ['./category-add.component.css']
})
export class CategoryAddComponent implements OnInit {

<<<<<<< Updated upstream
  categoryName = ''
  categoryDescription = ''
  category = null
  
=======
  categoryName=''
  categoryDescription=''
  event = null
  //categories = []

>>>>>>> Stashed changes
  constructor(
    private router: Router,
    private activatedRoute:ActivatedRoute,
    private eventcategoryservice:EventCategoryService)
    { }

  ngOnInit(): void 
<<<<<<< Updated upstream
  {
    const categoryId = this.activatedRoute.snapshot.queryParams['categoryId']
    if (categoryId) {
      // edit product
      this.eventcategoryservice
        .getCategoryDetails(categoryId)
        .subscribe(response => {
          if (response['status'] == 'success') {
            const categories = response['data']
            if (categories.length > 0) {
              this.category = categories[0]
              this.categoryName = this.category['categoryName']
              this.categoryDescription = this.category['categoryDescription']
            }
          }
        })
    }
  }

  onUpdate() 
  {
    if (this.category) {
      // edit
      this.eventcategoryservice
        .updateCategory(this.category['categoryId'], this.categoryName, this.categoryDescription)
=======
  { 
     const id = this.activatedRoute.snapshot.queryParams['categoryId']
     if('categoryId'){
       this.eventcategoryservice
       .getAllCategory()
       .subscribe(Response => {
         if(Response['status']=='success'){
           const events = Response['data']
           if(events.length >0){
             this.event = events[0]
             this.categoryName = this.event['categoryName']
           } 
         }
       })
     }
    //this.
  }
  loadEvents(){
    this.eventcategoryservice
    .getAllCategory()
    .subscribe(Response => {
      if(Response['status'] == 'success'){
        this.event = Response['data']
      }
    })
  }
  onEditCategory()
    {
     //this.router.navigate(['/category-add'],{queryParams:{categoryId:category['categoryId']}})
     if (this.event) {
      // edit
      this.eventcategoryservice
        .updateCategory(this.event['categoryId'],this.categoryName,this.categoryDescription)
>>>>>>> Stashed changes
        .subscribe(response => {
          if (response['status'] == 'success') {
            this.router.navigate(['/event-category'])
          }
        })
    } else {
      // insert
      this.eventcategoryservice
<<<<<<< Updated upstream
        .insertCategory(this.categoryName, this.categoryDescription)
        .subscribe(response => {
          if (response['status'] == 'success') {
            this.router.navigate(['/event-category'])
          }
        })
    }
  }
=======
        .insertCategory(this.categoryName,this.categoryDescription)
        .subscribe(response => {
          if (response['status'] == 'success') {
            this.router.navigate(['/event-categoty'])
          }
        })
    }
    }

>>>>>>> Stashed changes
}
