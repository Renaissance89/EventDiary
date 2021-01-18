import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private router: Router,
    private toastr : ToastrService
  ) { }

  ngOnInit(): void {
  }

  news(){
    this.toastr.success("thanks for subscribing "+sessionStorage["firstName"])
  }

  onLogout() {
    sessionStorage.removeItem('token')
    sessionStorage.removeItem('firstName')
    sessionStorage.removeItem('lastName')

    this.router.navigate(['/auth/login'])
  }
}
