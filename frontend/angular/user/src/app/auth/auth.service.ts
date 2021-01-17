import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url = 'http://localhost:4000/user'

  constructor(
    private router: Router,
    private httpClient: HttpClient
  ) { }

  login(email: string, password: string, role: string) {
    const body = {
      email: email,
      password: password,
      role: role
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
    else
    this.router.navigate(['/auth/login'])

    // user has not logged in yet
    // stop launching the component
    return false 
  }

  signup(firstName: string, lastName: string , email: string, password: string, phone: string, 
    city: string, state: string, gender: string, role: string) {
    const body = {
      firstName: firstName, 
      lastName: lastName,
      email: email,
      password: password,
      phone: phone, 
      city: city, 
      state: state, 
      gender: gender, 
      role: role
    }

    return this.httpClient.post(this.url + '/signup', body)
  }

  getOtp(email: string /*role: string*/) {
    const body = {
      email: email,
      //role: role
    }

    return this.httpClient.post(this.url + '/forgot-password', body)
  }

  resetPassword(password: string, otp) {
    const body = {
      email: sessionStorage['email'],
      password: password,
      otp: otp
    }

    return this.httpClient.put(this.url + '/reset-password', body)
  }
}