import { EventCategoryService } from './../event-category.service';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-category-add',
  templateUrl: './category-add.component.html',
  styleUrls: ['./category-add.component.css']
})
export class CategoryAddComponent implements OnInit {

  categoryName = ''
  categoryDescription = ''
  category = null
  
  constructor(
    private router: Router,
    private activatedRoute:ActivatedRoute,
    private eventcategoryservice:EventCategoryService)
    { }

  ngOnInit(): void 
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
        .subscribe(response => {
          if (response['status'] == 'success') {
            this.router.navigate(['/event-category'])
          }
        })
    } else {
      // insert
      this.eventcategoryservice
        .insertCategory(this.categoryName, this.categoryDescription)
        .subscribe(response => {
          if (response['status'] == 'success') {
            this.router.navigate(['/event-category'])
          }
        })
    }
  }
}
