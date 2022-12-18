import { Actions, ofType } from '@ngrx/effects';
import { map } from 'rxjs/operators';
import { selectUserBirthDate } from './../../store/selectors/user.selectors';
import {
  getUser,
  deleteUser,
  editUser,
  setUser,
} from './../../store/actions/users.actions';
import { AppState } from './../../store/state/app.state';
import { UserInfo } from '../../models/userInfo';
import { Component, OnInit } from '@angular/core';
import { Observable, takeUntil, tap, pipe, Subject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectUser } from '../../store/selectors/user.selectors';
import { TuiDestroyService, TuiDay } from '@taiga-ui/cdk';
import { Location } from '@angular/common';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  providers: [TuiDestroyService],
})
export class UserComponent implements OnInit {
  public user$: Observable<UserInfo | null> = this.store$.select(selectUser);
  public birthDate$ = this.store$.select(selectUserBirthDate);
  tuiday$?: Observable<TuiDay | null>;
  loading = true

  constructor(
    private actions$: Actions,
    private store$: Store<AppState>,
    private destroy$: TuiDestroyService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit() {
    this.tuiday$ = this.birthDate$.pipe(
      map((date) => {
        if(date == null)
        return null 
        else
       return this.fromLocalNativeDate(date)
      })
    );
    this.route.params
      .pipe(
        tap(({ id }) => {
          this.store$.dispatch(getUser({ userId: Number(id) }));
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();
this.actions$.pipe(
  ofType(setUser),
  map(() => this.loading = false
  
  ),
  takeUntil(this.destroy$)
).subscribe()
  }
 fromLocalNativeDate(date: Date): TuiDay {
  date = new Date(date)
    return new TuiDay(date.getFullYear(), date.getMonth(), date.getDate());
}
  deleteUser(user: UserInfo) {
    this.store$.dispatch(deleteUser({ id: user.id }));
  }
  backClicked() {
    this.location.back();
  }
}
