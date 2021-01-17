import { Router } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  isPresent = false;

  constructor(
    private router:Router)
    { }

  ngDoCheck() {
      if(sessionStorage['token']) {
        this.isPresent = true;
        this.router.navigate['/dashboard']
      } else {
        this.isPresent = false;
        this.router.navigate['/login']
      }    
  }

  onLogout()
  {
    sessionStorage.removeItem('token')
    sessionStorage.removeItem('firstName')
    sessionStorage.removeItem('lastName')
    this.router.navigate['/login']
  }

}
