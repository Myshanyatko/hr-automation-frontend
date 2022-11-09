import { userInfo } from './../models/userInfo';
import { getUsers } from './../store/actions/users.actions';
import { AppState } from './../store/state/app.state';

import { Observable } from 'rxjs';
import { User } from '../models/user';
import { select, Store } from '@ngrx/store';
import { UsersService } from './../services/users.service';
import { Component, OnInit } from '@angular/core';
import { selectUserList } from '../store/selectors/user.selectors';
@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.css'],
})
export class StaffComponent implements OnInit {
  users$: Observable<User[]> | null;
  search = '';
  readonly urlNewUser = 'tuiIconUser';
  constructor(
    public usersService: UsersService,
    private store$: Store<AppState>
  ) {
    this.users$ = this.store$.select(selectUserList);
  }

  ngOnInit(): void {
    this.store$.dispatch(getUsers());
    // this.usersService
    //   .getUsers()
    //   .subscribe((users) => this.store.dispatch(getUsers({ users })));
    console.log(this.users$);
  }
}
