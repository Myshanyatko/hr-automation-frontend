import { FormGroup, FormBuilder } from '@angular/forms';
import { getUsers } from './../store/actions/users.actions';
import { AppState } from './../store/state/app.state';

import { Observable } from 'rxjs';
import { User } from '../models/user';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { selectUserList } from '../store/selectors/user.selectors';
@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.css'],
})
export class StaffComponent implements OnInit {
  users$: Observable<User[]> | null;
  usersForm!: FormGroup;
  readonly urlNewUser = 'tuiIconUser';
  constructor(private fb: FormBuilder, private store$: Store<AppState>) {
    this.users$ = this.store$.select(selectUserList);
  }

  ngOnInit(): void {
    this.usersForm = this.fb.group({
      name: ['', []],
    });
    this.store$.dispatch(getUsers());
  }
  searchUsers() {}
}
