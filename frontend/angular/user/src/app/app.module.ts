import { ToastrModule } from 'ngx-toastr';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
//import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {OragnizerGuard} from './oragnizer.guard'
import { from } from 'rxjs';
//import {DashboardComponent} from './odashboard/dashboard/dashboard.component'
//import { DashboardComponent } from './dashboard/dashboard.component';
//import { OrgnizerDashboardComponent } from './orgnizer-dashboard/orgnizer-dashboard.component';

//import { EventListComponent } from './event-list/event-list.component';
//import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
  //  DashboardComponent,
 //   OrgnizerDashboardComponent,
   // EventListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    NgbModule,
    ToastrModule.forRoot()
  ],
  providers: [OragnizerGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
