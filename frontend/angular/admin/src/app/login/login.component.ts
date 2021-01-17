import { AdminService } from './../admin.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email=''
  password=''

  constructor(private router:Router,
    private toastr: ToastrService,
    private adminService:AdminService) { }

  ngOnInit(): void {
  }
 onLogin()
 {
   this.adminService
   .login(this.email,this.password)
   .subscribe(response=>
    {
      if(response['status']=='success')
      {
        const data = response['data']
         // console.log(data)

          sessionStorage['token'] = data['token']
          sessionStorage['firstName'] = data['firstName']
          sessionStorage['lastName'] = data['lastName']
      

          this.router.navigate(['/dashboard'])
          this.toastr.success("welcome "+sessionStorage['firstName'])
      }else
      {
        this.toastr.error('invalid email or password')
      }
    })

 }
}
