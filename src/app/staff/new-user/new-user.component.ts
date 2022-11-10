import { initialUserState } from './../../store/state/users.state';
import { UserInfo } from './../../models/userInfo';
import { addNewUser } from './../../store/actions/users.actions';
import { AppState } from 'src/app/store/state/app.state';
import { Store } from '@ngrx/store';
import { TuiDialogService, TuiDialogContext } from '@taiga-ui/core';
import { PolymorpheusContent } from '@tinkoff/ng-polymorpheus';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  Inject,
} from '@angular/core';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewUserComponent implements OnInit {
  createUserForm!: FormGroup;
  user: UserInfo = initialUserState.selectedUser;
  constructor(
    private store$: Store<AppState>,
    @Inject(TuiDialogService) private readonly dialogService: TuiDialogService
  ) {}

  ngOnInit(): void {
    this.createUserForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      name: new FormControl('', [Validators.required]),
      date: new FormControl(''),
      project: new FormControl(''),
      post: new FormControl(''),
      information: new FormControl(''),
      admin: new FormControl(false),
    });
  }
  saveUser(content: PolymorpheusContent<TuiDialogContext>) {
    this.user = {
      ...this.user,
      username: this.createUserForm.value.name,
      date: this.createUserForm.value.date,
      email: this.createUserForm.value.email,
      project: this.createUserForm.value.project,
      post: this.createUserForm.value.post,
      admin: this.createUserForm.value.admin,
      information: this.createUserForm.value.admin,
    };
    this.store$.dispatch(addNewUser({ user: this.user }));
    this.dialogService.open(content).subscribe();
  }
}
