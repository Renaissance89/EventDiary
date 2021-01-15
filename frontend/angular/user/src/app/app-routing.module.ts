import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
//import { OrgnizerDashboardComponent } from './orgnizer-dashboard/orgnizer-dashboard.component';
//import { EventComponent } from './event/event-list/event-list.component';
//import {DashboardComponent} from './odashboard/dashboard/dashboard.component'



import { AuthService } from './auth/auth.service';
import { OragnizerGuard } from './oragnizer.guard';

const routes: Routes = [
  // default route
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { 
    path: 'home',
    component: HomeComponent, 
    canActivate: [AuthService],
    children:[
      { path: 'event', loadChildren: () => import('./event/event.module').then(m => m.EventModule ) }
    ]
  },
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)},
  // {path:'orgnizer',component:DashboardComponent,canActivate:[OragnizerGuard]},
  // {
  //   path:'orgnizer-dashboard',
  //   component: DashboardComponent,
  //   canActivate : [AuthService],
  //   children:[
  //     { path: 'dashboard', loadChildren: () => import('./odashboard/odashboard.module').then(m => m.OdashboardModule)}
  //   ]
  // }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
