import { AdminService } from './admin.service';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AdminComponentComponent } from './admin-component/admin-component.component';

import {HttpClientModule} from '@angular/common/http'
import {FormsModule} from '@angular/forms';
import { AdminOrganiserdataComponent } from './admin-organiserdata/admin-organiserdata.component';

import{RouterModule, Routes} from '@angular/router';
import { AdminLoginComponent } from './admin-login/admin-login.component';


const routes:Routes=[
{path:'userData',component:AdminComponentComponent},
{path:'organizerData',component:AdminOrganiserdataComponent},

]
@NgModule({
  declarations: [
    AppComponent,
    AdminComponentComponent,
    AdminOrganiserdataComponent,
    AdminLoginComponent,

   
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
   AdminService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
