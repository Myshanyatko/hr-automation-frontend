import { UserComponent } from './../user/user.component';
import { UsersService } from './../../services/users.service';
import { userInfo } from '../../models/userInfo';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css'],
})
export class EditUserComponent implements OnInit {
  userForm!: FormGroup;
  user: userInfo = {
    id: 1,
    username: '',
    date: '',
    email: '',
    post: '',
    project: '',
    photo: '',
    information: '',
    admin: false,
  };
  constructor(
    private userComponent: UserComponent,
    private userService: UsersService
  ) {}

  ngOnInit(): void {
    this.user = this.userComponent.user;
    this.userForm = new FormGroup({
      email: new FormControl(this.user.email, [Validators.email]),
      name: new FormControl(this.user.username),
      date: new FormControl(this.user.date),
      project: new FormControl(this.user.project),
      post: new FormControl(this.user.post),
      information: new FormControl(this.user.information),
      admin: new FormControl(this.user.admin),
    });
  }
  saveUser() {
    this.user = {
      ...this.user,
      id: this.user.id,
      username: this.userForm.value.name,
      date: this.userForm.value.date,
      email: this.userForm.value.email,
      project: this.userForm.value.project,
      post: this.userForm.value.post,
      admin: this.userForm.value.admin,
      information: this.userForm.value.information,
    };
    this.userService.putAPIUser(this.user);
    this.userComponent.isEdit = false;
  }
}
