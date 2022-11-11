import { editUser } from './../../store/actions/users.actions';
import { Store } from '@ngrx/store';
import { UserComponent } from './../user/user.component';
import { UsersService } from './../../services/users.service';
import { UserInfo } from '../../models/userInfo';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AppState } from 'src/app/store/state/app.state';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css'],
})
export class EditUserComponent implements OnInit {
  @Input()
  user: UserInfo | null = null;

  @Output()
  userEdited = new EventEmitter<UserInfo>();

  userForm!: FormGroup;

  constructor(private fb: FormBuilder, private store$: Store<AppState>) {}

  ngOnInit(): void {
    this.userForm = this.fb.group({
      email: [this.user?.email, [Validators.email, Validators.required]],
      name: [this.user?.username, [Validators.required]],
      date: [this.user?.date],
      project: [this.user?.project],
      post: [this.user?.post],
      information: [this.user?.information],
      admin: [this.user?.admin],
    });
  }
  saveUser() {
    if (this.user == null) {
      return;
    }
    const user = {
      ...this.user,
      username: this.userForm.value.name,
      date: this.userForm.value.date,
      email: this.userForm.value.email,
      project: this.userForm.value.project,
      post: this.userForm.value.post,
      admin: this.userForm.value.admin,
      information: this.userForm.value.information,
    };

    this.userEdited.emit(user);
  }
}
