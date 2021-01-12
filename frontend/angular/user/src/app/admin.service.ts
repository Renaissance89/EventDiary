import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  url = 'http://localhost:4000/user'

  constructor(
    private router: Router,
    private httpClient: HttpClient) { }
  
  login(email: string, password: string) {
    const body = {
      email: email,
      password: password
    }

    return this.httpClient.post(this.url + '/signin', body)
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (sessionStorage['token']) {
      // user is already logged in
      // launch the component
      return true
    }

    // force user to login
    this.router.navigate(['/login'])

    // user has not logged in yet
    // stop launching the component
    return false 
  }
}
