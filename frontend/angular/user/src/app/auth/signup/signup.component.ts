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
    if (this.firstName.length == 0) {
      this.toastr.warning('Please Enter First Name')
    } else if (this.lastName.length == 0) {
      this.toastr.warning('Please Enter Last Name')
    } else if (this.email.length == 0) {
      this.toastr.warning('Please Enter Email')
    } else if (this.password.length == 0) {
      this.toastr.warning('Please Enter Password')
    } else if (this.phone.length == 0) {
      this.toastr.warning('Please Enter Mobile')
    } else if (this.city.length == 0) {
      this.toastr.warning('Please Enter City')
    } else if (this.state.length == 0) {
      this.toastr.warning('Please Enter State')
    } else if (this.gender != 'male' && this.gender != 'female' && this.gender != 'other') {
      this.toastr.warning('Please Enter Gender')
    } else if (this.role != 'user' && this.role != 'organizer') {
      this.toastr.warning('Please Enter Role')
    } else {
      this.authService
      .signup(this.firstName, this.lastName, this.email, this.password, this.phone, this.city, this.state, this.gender, this.role)
      .subscribe(response=>
      {
        if(response['status']=='success')
        {
          const data = response['data']
            this.toastr.success('Account Created Successfully. Please check email')
            this.router.navigate(['/auth/login'])
        } else {
          this.toastr.error('Account Creation Failed')
        }
      })
    }  
  }
}
