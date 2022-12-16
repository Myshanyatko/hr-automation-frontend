import { FormGroup, FormBuilder } from '@angular/forms';
import { getFilteredUsers, getUsers } from './../store/actions/users.actions';
import { AppState } from './../store/state/app.state';

import { Observable } from 'rxjs';
import { User } from '../models/user';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { selectPages, selectUserList } from '../store/selectors/user.selectors';
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
  constructor(private fb: FormBuilder, private store$: Store<AppState>) {}

  ngOnInit(): void {
    this.usersForm = this.fb.group({
      name: [ sessionStorage.getItem('usersFilter'), []],
    });
     this.store$.dispatch(getUsers({ pageNumber: this.index }));
  }
  searchUsers() {
    
    sessionStorage.setItem('usersFilter', this.usersForm.value.name)
    this.store$.dispatch(getUsers({ pageNumber: this.index }));
  }
  goToPage(index: number) {
    this.store$.dispatch(getUsers({ pageNumber: index }));
  }
}
