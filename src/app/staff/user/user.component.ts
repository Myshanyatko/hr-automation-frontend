import { userInfo } from '../../models/userInfo';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsersService } from './../../services/users.service';
import { Component, OnInit, Inject, SimpleChanges } from '@angular/core';
import { TuiDialogService, TuiDialogContext } from '@taiga-ui/core';
import { PolymorpheusContent } from '@tinkoff/ng-polymorpheus';
import { observable, Observable, Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { usersReducer } from 'src/app/store/reducers/users.reducer';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  // user$: Observable<userInfo>;
  user: userInfo = {
    id: 1,
    username: '',
    date: '',
    email: '',
    post: '',
    project: '',
    photo: '',
    information: '',
    admin: false,
  };
  public isEdit = false;
  id: number | undefined;
  private subscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private store: Store<{ user: userInfo }>,
    private readonly dialogService: TuiDialogService,
    private userService: UsersService
  ) {
    this.subscription = route.params.subscribe(
      (params) => (this.id = params['id'])
    );
  }
  //оно здесь временно живет
  getUser() {
    this.userService.getAPIUser(Number(this.id)).subscribe({
      next: (res: any) => (this.user = res),
      error: (err) => alert(err.message),
    });
    this.user = this.userService.getUser();
  }
  ngOnInit() {
    this.getUser();
  }

  editUser() {
    this.isEdit = true;
  }
  showDialogDelete(content: PolymorpheusContent<TuiDialogContext>): void {
    this.dialogService.open(content).subscribe();
  }
  deleteUser() {
    console.log('Уволен!');
    this.userService.deleteAPIUser(this.user.id);
  }
}
