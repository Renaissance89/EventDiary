import { CategoryAddComponent } from './category-add/category-add.component';
import { AdminService } from './admin.service';
import { EventCategoryComponent } from './event-category/event-category.component';
import { LoginComponent } from './login/login.component';
import { EventListComponent } from './event-list/event-list.component';
import { FeedbackListComponent } from './feedback-list/feedback-list.component';
import { SponserListComponent } from './sponser-list/sponser-list.component';
import { OrganizerListComponent } from './organizer-list/organizer-list.component';
import { UserListComponent } from './user-list/user-list.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path:'dashboard',component:DashboardComponent,canActivate:[AdminService]},
  {path:'user-list',component:UserListComponent,canActivate:[AdminService]},
  {path:'organizer-list',component:OrganizerListComponent,canActivate:[AdminService]},
  {path:'sponser-list',component:SponserListComponent,canActivate:[AdminService]},
  {path:'event-list',component:EventListComponent,canActivate:[AdminService]},
  {path:'feedback-list',component:FeedbackListComponent,canActivate:[AdminService]},
  {path:'login',component:LoginComponent},
  {path:'event-category',component:EventCategoryComponent,canActivate:[AdminService]},
  {path:'category-add',component:CategoryAddComponent,canActivate:[AdminService]}
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
