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

  constructor(private router:Router,
    private authService: AuthService) { }

  ngOnInit(): void {
  }
 onLogin()
 {
   this.authService
   .login(this.email,this.password)
   .subscribe(response=>
    {
      if(response['status']=='success')
      {
        const data = response['data']
          console.log(data)

          sessionStorage['token'] = data['token']
          sessionStorage['firstName'] = data['firstName']
          sessionStorage['lastName'] = data['lastName']
      

          this.router.navigate(['/home'])
      }else
      {
        alert('invalid email or password')
      }
    })

 }

}
