import { Router } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  constructor(
    private router:Router)
    {

    }
  
  onLogout()
  {
    sessionStorage.removeItem('token')
    sessionStorage.removeItem('firstName')
    sessionStorage.removeItem('lastName')

  this.router.navigate['/login']
  }

}
