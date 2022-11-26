import { filter, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { UserInfo } from './../../models/userInfo';
import {
  addNewUser,
  addNewUserSuccess,
} from './../../store/actions/users.actions';
import { AppState } from 'src/app/store/state/app.state';
import { Store } from '@ngrx/store';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { pipe } from 'rxjs';

let nextProcessId = 1;

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewUserComponent implements OnInit {
  createUserForm!: FormGroup;
  user: UserInfo | null = null;
  errors = false;

  constructor(
    private actions$: Actions,
    private fb: FormBuilder,
    private router: Router,
    private store$: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.createUserForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      date: [''],
      project: [''],
      post: [''],
      about: [''],
      admin: [false],
    });
  }
  saveUser() {
    if (
      this.createUserForm.get('name')?.invalid ||
      this.createUserForm.get('email')?.invalid
    ) {
      this.errors = true;
    } else {
      if (this.user == null) {
        this.user = {
          id: 0,
          photo: null,
          username: this.createUserForm.value.name,
          birthDate: this.createUserForm.value.birthDate,
          email: this.createUserForm.value.email,
          project: this.createUserForm.value.project,
          post: this.createUserForm.value.post,
          admin: this.createUserForm.value.admin,
          about: this.createUserForm.value.about,
        };
      }
      const processId = nextProcessId + 1;
      this.actions$
        .pipe(
          ofType(addNewUserSuccess),
          filter((action) => action.processId === processId)
        )
        .subscribe(() => {
          return this.router.navigate(['/users']);
        });

      this.store$.dispatch(
        addNewUser({ user: this.user, processId: processId })
      );
      this.errors = false;
    }
  }
}
