import { UsersService } from './../services/users.service';
import { Component, OnInit } from '@angular/core';
import { User } from './user';
@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.css'],
})
export class StaffComponent implements OnInit {
  users: User[] = [];
  search = ``;
  readonly urlNewUser = 'tuiIconUser';
  constructor(public usersService: UsersService) {}

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.usersService.getUsers().subscribe((users) => (this.users = users));
  }
}
