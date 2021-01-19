import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  email = ''
  password = ''
  otp = ''
  
  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
  }

  onResetPassword() {
    this.authService
    .resetPassword(this.password, this.otp)
    .subscribe(response=>
    {
      if(response['status']=='success')
      {
        const data = response['data']

        this.router.navigate(['/auth/login'])
        this.toastr.success('Reset Password Successful')
        sessionStorage.removeItem('email')
        this.modalService.dismissAll()
      }  
      else {
        this.toastr.error('Invalid OTP')
      }
    })
  }
}