import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ResetPasswordComponent } from './../reset-password/reset-password.component';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  email = ''
  role = ''
  
  constructor(
    private authService: AuthService,
    private toastr: ToastrService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
  }

  onGetOtp() {
    if (this.email.length == 0) {
      this.toastr.warning('Please Enter Email')
    } else {
      this.authService
      .getOtp(this.email)
      .subscribe(response=>
      {
        if(response['status']=='success')
        {
          const data = response['data']
        
            sessionStorage['email'] = data['email']
            
            this.modalService.open(ResetPasswordComponent, { size: 'md'})
            this.toastr.success('OTP sent to ' + data['email'])
        }  
        else {
          this.toastr.error('Invalid Email')
        }
      })
    }
  }
}
