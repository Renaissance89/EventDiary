import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthService } from './auth/auth.service';

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
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
