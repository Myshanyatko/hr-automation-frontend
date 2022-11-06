import { UserComponent } from './../user/user.component';
import { UsersService } from './../../services/users.service';
import { userInfo } from './../user/userInfo';
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
    private userService: UsersService,
    private userComponent: UserComponent
  ) {}

  ngOnInit(): void {
    this.userForm = new FormGroup({
      email: new FormControl(this.user.email, [
        Validators.required,
        Validators.email,
      ]),
      name: new FormControl(this.user.username, [Validators.required]),
      project: new FormControl(this.user.project, [Validators.required]),
      post: new FormControl(this.user.post, [Validators.required]),
      information: new FormControl(this.user.information, [
        Validators.required,
      ]),
      admin: new FormControl(this.user.admin),
    });
  }
  saveUser() {
    this.user = {
      ...this.user,
      id: this.user.id,
      username: this.userForm.value.name,
      email: this.userForm.value.email,
      project: this.userForm.value.project,
      post: this.userForm.value.post,
      admin: this.userForm.value.admin,
    };
    console.log(this.user);
    this.userService.putAPIUser(this.user);
    this.userComponent.isEdit = false;
  }
}
