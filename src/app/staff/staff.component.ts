import { DialogService } from './../services/dialog.service';
import { getUsers } from './../store/actions/users.actions';
import { AppState } from './../store/state/app.state';

import { Observable } from 'rxjs';
import { User } from '../models/user';
import { Store } from '@ngrx/store';
import { Component, Input, OnInit } from '@angular/core';
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
    private dialogService: DialogService,
    private store$: Store<AppState>
  ) {
    this.users$ = this.store$.select(selectUserList);
  }

  ngOnInit(): void {
    this.store$.dispatch(getUsers());
  }
}
