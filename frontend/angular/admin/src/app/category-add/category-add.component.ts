import { EventCategoryService } from './../event-category.service';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-category-add',
  templateUrl: './category-add.component.html',
  styleUrls: ['./category-add.component.css']
})
export class CategoryAddComponent implements OnInit {

  categoryName=''

  constructor(
    private activatedRoute:ActivatedRoute,
    private eventcategoryservice:EventCategoryService){}

  ngOnInit(): void 
  {
    
  }


}
