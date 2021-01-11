import { FeedbackService } from './feedback.service';
import { EventCategoryService } from './event-category.service';
import { SponserService } from './sponser.service';
import { OrganizerService } from './organizer.service';
import { UserService } from './user.service';
import { AdminService } from './admin.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http'
import {FormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserListComponent } from './user-list/user-list.component';
import { OrganizerListComponent } from './organizer-list/organizer-list.component';
import { SponserListComponent } from './sponser-list/sponser-list.component';
import { FeedbackListComponent } from './feedback-list/feedback-list.component';
import { EventListComponent } from './event-list/event-list.component';
import { LoginComponent } from './login/login.component';
import { EventCategoryComponent } from './event-category/event-category.component';
import { EventService } from './event.service';
import { CategoryAddComponent } from './category-add/category-add.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DashboardComponent,
    UserListComponent,
    OrganizerListComponent,
    SponserListComponent,
    FeedbackListComponent,
    EventListComponent,
    LoginComponent,
    EventCategoryComponent,
    CategoryAddComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    AdminService,
    UserService,
    OrganizerService,
    SponserService,
    EventCategoryService,
    EventService,
    FeedbackService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
