import { map } from 'rxjs/operators';
import { FormGroup, FormBuilder } from '@angular/forms';
import {
  getFilteredUsers,
  getUsers,
  setUsers,
} from './../store/actions/users.actions';
import { AppState } from './../store/state/app.state';

import { Observable } from 'rxjs';
import { User } from '../models/user';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { selectPages, selectUserList } from '../store/selectors/user.selectors';
import { Actions, ofType } from '@ngrx/effects';
@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.css'],
})
export class StaffComponent implements OnInit {
  index = 0;
  pages$ = this.store$.select(selectPages);
  users$: Observable<User[] | null> | null = this.store$.select(selectUserList);
  usersForm!: FormGroup;
  readonly urlNewUser = 'tuiIconUser';
  loading = true;

  constructor(
    private actions$: Actions,
    private fb: FormBuilder,
    private store$: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.usersForm = this.fb.group({
      name: [localStorage.getItem('usersFilter'), []],
    });
    this.store$.dispatch(getUsers({ pageNumber: this.index }));
    this.actions$
      .pipe(
        ofType(setUsers),
        map(() => (this.loading = false))
      )
      .subscribe();
  }
  searchUsers() {
    this.loading = true;
    localStorage.setItem('usersFilter', this.usersForm.value.name);
    this.store$.dispatch(getUsers({ pageNumber: this.index }));
    this.actions$
      .pipe(
        ofType(setUsers),
        map(() => (this.loading = false))
      )
      .subscribe();
  }
  goToPage(index: number) {
    this.store$.dispatch(getUsers({ pageNumber: index }));
  }
}
