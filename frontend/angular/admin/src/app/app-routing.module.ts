
import { LoginComponent } from './login/login.component';
 import { DashboardComponent } from './dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminService } from './admin.service';

const routes: Routes = [
   { path: 'dashboard', component: DashboardComponent, canActivate: [AdminService] },  
   { path: 'login', component: LoginComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

            
