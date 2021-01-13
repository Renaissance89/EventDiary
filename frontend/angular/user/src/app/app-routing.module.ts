import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';


import { AdminService } from './admin.service';
import { EventListComponent } from './event-list/event-list.component';
import { LoginComponent } from './login/login.component';



const routes: Routes = [
  {path:'dashboard',component:DashboardComponent,canActivate:[AdminService]},
  {path:'event-list',component:EventListComponent,canActivate:[AdminService]},
  {path:'login',component:LoginComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
