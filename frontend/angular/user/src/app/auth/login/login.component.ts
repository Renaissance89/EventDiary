import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AuthService } from './../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email = ''
  password = ''
  role = ''

  constructor(
    private router:Router,
    private authService: AuthService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
  }

  onLogin()
  {
    if (this.email.length == 0) {
      this.toastr.warning('Please Enter Email')
    } else if (this.password.length == 0) {
      this.toastr.warning('Please Enter Password')
    } else if (this.role != 'user' && this.role != 'organizer') {
      this.toastr.warning('Please Enter Role')
    } else {
      this.authService
      .login(this.email, this.password, this.role)
      .subscribe(response=>
        {
        if(response['status']=='success' && this.role === 'user')
        {
          const data = response['data']

          sessionStorage['token'] = data['token']
          sessionStorage['firstName'] = data['firstName']
          sessionStorage['lastName'] = data['lastName']
          sessionStorage['role'] = data['role']
      
          this.router.navigate(['/home/home-carousel'])
          this.toastr.success('Welcome ' + data['firstName'] + " " + data['lastName'])
        } 
        else if(response['status']=='success' && this.role === 'organizer') {
          const data = response['data']

          sessionStorage['token'] = data['token']
          sessionStorage['firstName'] = data['firstName']
          sessionStorage['lastName'] = data['lastName']
          sessionStorage['role'] = data['role']
      
          this.router.navigate(['dashboard/event/odashboard'])
          this.toastr.success('Welcome ' + data['firstName'] + " " + data['lastName'])
        } 
        else {
          this.toastr.error('Invalid Email or Password')
        }
      })
    }


   
  }
}