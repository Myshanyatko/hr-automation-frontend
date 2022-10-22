import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsersService } from './../../services/users.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  userForm!: FormGroup;
  public user = {
    "email": null,
    "name": null,
    "project": null,
    "post": null,
    "photo": null,
    "information": null,
    "admin": true
  };
  public isEdit = false;
  constructor(private userService: UsersService) { }

  ngOnInit(): void {
    this.userService.getAPIUser();

    this.user = this.userService.getUser();
    this.userForm = new FormGroup(
      {
        'email': new FormControl(this.user.email, [Validators.required, Validators.email]),
        'name': new FormControl(this.user.name, [Validators.required]),
        'project': new FormControl(this.user.project, [Validators.required]),
        'post': new FormControl(this.user.post, [Validators.required]),
        // 'information': new FormControl(this.user.information, [Validators.required]),
        'admin': new FormControl(this.user.admin)
      }
    )
  }

  submitSaveUser() {
    this.user = {...this.user, name: this.userForm.value.name, email: this.userForm.value.email, project: this.userForm.value.project, post: this.userForm.value.post, admin: this.userForm.value.admin}
    console.log(this.user)
    this.userService.putAPIUser(this.user)
    this.isEdit = false
  }
  submitEditUser() {
    this.isEdit = true
  }
  
}
