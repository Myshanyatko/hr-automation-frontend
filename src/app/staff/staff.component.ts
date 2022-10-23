import { UsersService } from './../services/users.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.css']
})
export class StaffComponent implements OnInit {

  users: any = [];
  constructor(public usersService: UsersService) { }

  ngOnInit(): void {
   this.usersService.getAPIUsers();
   this.users = this.usersService.getUsers()
  console.log(this.users);}
    
  open(){
    
  }
  
}
