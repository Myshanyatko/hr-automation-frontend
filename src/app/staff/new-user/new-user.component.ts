import { initialUserState } from './../../store/state/users.state';
import { UserInfo } from './../../models/userInfo';
import { addNewUser } from './../../store/actions/users.actions';
import { AppState } from 'src/app/store/state/app.state';
import { Store } from '@ngrx/store';
import { TuiDialogService, TuiDialogContext } from '@taiga-ui/core';
import { PolymorpheusContent } from '@tinkoff/ng-polymorpheus';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewUserComponent {
  createUserForm: FormGroup;
  user: UserInfo = initialUserState.selectedUser;

  constructor(private store$: Store<AppState>, private fb: FormBuilder) {
    this.createUserForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      date: [''],
      project: [''],
      post: [''],
      information: [''],
      admin: [false],
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
  }
}
