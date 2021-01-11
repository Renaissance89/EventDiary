import { UserService } from './../user.service';
import { AdminService } from './../admin.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users=[]
  constructor(private userservice:UserService) {

   }

  ngOnInit(): void {
    this.loadUsers()
  
  }

  loadUsers()
  {
    this.userservice
    .getAllusers()
    .subscribe(response=>
      {
        if(response['status']=='success')
        {
          this.users=response['data']
        }
        else{
          console.log(response['error'])
        }
      })
  }
  toggleActive(user)
  {
    this.userservice
    .toggleActiveStatus(user)
    .subscribe(response=>
      {
        if(response['status']=='success')
        {
          this.loadUsers()
        }
        else{
          console.log(response['error'])
        }
        
      })

  }

}
