import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email=''
  password=''
  role=''

  constructor(private router:Router,
    private authService: AuthService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
  }
  
  onLogin()
  {
   this.authService
   .login(this.email,this.password, this.role)
   .subscribe(response=>
    {
      if(response['status']=='success' && this.role == 'user')
      {
        const data = response['data']
          console.log(data)

          sessionStorage['token'] = data['token']
          sessionStorage['firstName'] = data['firstName']
          sessionStorage['lastName'] = data['lastName']
          sessionStorage['role'] = data['role']
      
          this.router.navigate(['/home'])
          this.toastr.success('Welcome ' + data['firstName'])
      } 
      else if(response['status']=='success' && this.role == 'organizer') {
        const data = response['data']
          console.log(data)

          sessionStorage['token'] = data['token']
          sessionStorage['firstName'] = data['firstName']
          sessionStorage['lastName'] = data['lastName']
          sessionStorage['role'] = data['role']
      
          this.router.navigate(['/organizer-dashboard'])
          this.toastr.success('Welcome ' + data['firstName'])
      } 
      else {
        alert('Invalid Email or Password')
      }
    })
  }
}
