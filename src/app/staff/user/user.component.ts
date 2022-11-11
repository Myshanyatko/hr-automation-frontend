import { DialogService } from './../../services/dialog.service';
import { initialUserState } from './../../store/state/users.state';
import {
  getUser,
  deleteUser,
  editUser,
} from './../../store/actions/users.actions';
import { AppState } from './../../store/state/app.state';
import { UserInfo } from '../../models/userInfo';
import { UsersService } from './../../services/users.service';
import { Component, OnInit } from '@angular/core';
import { TuiDialogService, TuiDialogContext } from '@taiga-ui/core';
import { PolymorpheusContent } from '@tinkoff/ng-polymorpheus';
import { Observable, Subscription, takeUntil, tap } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectUser } from '../../store/selectors/user.selectors';
import { TuiDestroyService } from '@taiga-ui/cdk';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  providers: [TuiDestroyService],
})
export class UserComponent implements OnInit {
  public user$: Observable<UserInfo> = this.store$.select(selectUser);

  public isEdit = false;

  constructor(
    private destroy$: TuiDestroyService,
    private store$: Store<AppState>,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params
      .pipe(
        tap(({ id }) => {
          this.store$.dispatch(getUser({ userId: Number(id) }));
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  editUser() {
    this.isEdit = true;
  }

  deleteUser(user: UserInfo) {
    this.store$.dispatch(deleteUser({ id: user.id }));
  }
  saveUser(user: UserInfo) {
    this.store$.dispatch(editUser({ user: user }));
    this.isEdit = false;
  }
}
