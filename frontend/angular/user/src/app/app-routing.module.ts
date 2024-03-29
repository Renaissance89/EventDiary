import { HomeCarouselComponent } from './user/home-carousel/home-carousel.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthService } from './auth/auth.service';
import { DashboardComponent } from './organizer/dashboard/dashboard.component';
import { AboutUsComponent } from './shared/about-us/about-us.component';
import { ContactUsComponent } from './shared/contact-us/contact-us.component';
import { HomeComponent } from './user/home/home.component';

const routes: Routes = [
  // default route
  { path: '', redirectTo: '/auth/login', pathMatch: 'full' },
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)},
  //User
  {
    path: 'home',
    component: HomeComponent, 
    canActivate: [AuthService],
    children: [
      { path: 'event', loadChildren: () => import('./user/event/event.module').then(m => m.EventModule)}, 
      { path: 'about-us', component: AboutUsComponent},
      { path: 'contact-us', component: ContactUsComponent},
      { path: 'home-carousel', component: HomeCarouselComponent},
    ]
  },
  //Organizer
  {
    path: 'dashboard',
    component: DashboardComponent, 
    canActivate: [AuthService],
    children: [
      { path: 'event', loadChildren: () => import('./organizer/event/event.module').then(m => m.EventModule)}, 
      { path: 'about-us', component: AboutUsComponent},
      { path: 'contact-us', component: ContactUsComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
