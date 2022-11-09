import { initialUserState } from './../../store/state/users.state';
import { getUser } from './../../store/actions/users.actions';
import { AppState } from './../../store/state/app.state';

import { userInfo } from '../../models/userInfo';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsersService } from './../../services/users.service';
import { Component, OnInit, Inject, SimpleChanges } from '@angular/core';
import { TuiDialogService, TuiDialogContext } from '@taiga-ui/core';
import { PolymorpheusContent } from '@tinkoff/ng-polymorpheus';
import { observable, Observable, Subscription, take } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectUser } from '../../store/selectors/user.selectors';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  user$: Observable<userInfo>;
  public isEdit = false;
  id: number | undefined;
  private subscription: Subscription;
  user: userInfo = initialUserState.selectedUser;
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
    this.userService.deleteAPIUser(Number(this.user$.pipe(take(1)).subscribe));

    this.http.navigate(['users']);
  }
}
