import { userInfo } from './userInfo';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsersService } from './../../services/users.service';
import { Component, OnInit, Inject, SimpleChanges } from '@angular/core';
import { TuiDialogService, TuiDialogContext } from '@taiga-ui/core';
import { PolymorpheusContent } from '@tinkoff/ng-polymorpheus';
import { observable, Observable, Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
//что с этим делать...
//  interface UserForm<T> {
//   name: T;
//   project: T;
//   post: T;
//   information: T;
//   admin: FormControl<boolean>;
//   email: T;
// }
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
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
    private readonly dialogService: TuiDialogService,
    private route: ActivatedRoute,
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
