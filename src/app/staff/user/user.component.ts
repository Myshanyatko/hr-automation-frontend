import { initialUserState } from './../../store/state/users.state';
import { getUser, deleteUser } from './../../store/actions/users.actions';
import { AppState } from './../../store/state/app.state';
import { UserInfo } from '../../models/userInfo';
import { UsersService } from './../../services/users.service';
import { Component, OnInit } from '@angular/core';
import { TuiDialogService, TuiDialogContext } from '@taiga-ui/core';
import { PolymorpheusContent } from '@tinkoff/ng-polymorpheus';
import { Observable, Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectUser } from '../../store/selectors/user.selectors';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  user$: Observable<UserInfo>;
  public isEdit = false;
  id: number | undefined;
  private subscription: Subscription;
  user: UserInfo = initialUserState.selectedUser;
  constructor(
    private http: Router,
    private readonly dialogService: TuiDialogService,
    private route: ActivatedRoute,
    private store$: Store<AppState>,
    private userService: UsersService
  ) {
    this.subscription = route.params.subscribe(
      (params) => (this.id = params['id'])
    );
    this.user$ = this.store$.select(selectUser);
    this.user$.subscribe((user) => (this.user = user));
  }
  ngOnInit() {
    this.store$.dispatch(getUser({ userId: Number(this.id) }));
  }

  editUser() {
    this.isEdit = true;
  }
  showDialogDelete(content: PolymorpheusContent<TuiDialogContext>): void {
    this.dialogService.open(content).subscribe();
  }
  deleteUser() {
    this.store$.dispatch(deleteUser({ id: Number(this.id) }));

    this.http.navigate(['users']);
  }
}
