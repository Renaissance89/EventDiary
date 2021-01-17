import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { AuthService } from './../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  firstName = ''
  lastName = ''
  email = ''
  password = ''
  phone = ''
  city = ''
  state = ''
  gender = ''
  role = ''

  constructor(
    private router:Router,
    private authService: AuthService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
  }

  onSignup() {
    this.authService
      .signup(this.firstName, this.lastName, this.email, this.password, this.phone, this.city, this.state, this.gender, this.role)
      .subscribe(response=>
        {
          if(response['status']=='success')
          {
            const data = response['data']
              console.log(data)
              this.toastr.success('Account Created Successfully. Please check email')
              this.router.navigate(['/login'])
          } else {
            this.toastr.error('Account Creation Failed')
          }
        })
  }
}
