import { Actions, ofType } from '@ngrx/effects';
import { TuiDestroyService, TuiDay } from '@taiga-ui/cdk';
import { Router } from '@angular/router';
import { selectUser } from './../../store/selectors/user.selectors';
import { switchMap, map, finalize, tap, filter } from 'rxjs/operators';
import { Subject, timer, Observable, of, takeUntil } from 'rxjs';
import { editUser } from './../../store/actions/users.actions';
import { Store } from '@ngrx/store';
import { UserInfo } from '../../models/userInfo';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppState } from 'src/app/store/state/app.state';
import { TuiFileLike } from '@taiga-ui/kit';

let nextProcessId = 1;

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css'],
  providers: [TuiDestroyService],
})
export class EditUserComponent implements OnInit, OnDestroy {
  public user$: Observable<UserInfo> = this.store$.select(selectUser);
  userForm!: FormGroup;
  errors = false;
  loading = false;

  readonly control = new FormControl();
  readonly rejectedFiles$ = new Subject<TuiFileLike | null>();
  readonly loadingFiles$ = new Subject<TuiFileLike | null>();
  readonly loadedFiles$ = this.control.valueChanges.pipe(
    switchMap((file) => (file ? this.makeRequest(file) : of(null)))
  );
  id = -1;

  constructor(
    private actions$: Actions,
    private fb: FormBuilder,
    private router: Router,
    private store$: Store<AppState>,
    private destroy$: TuiDestroyService
  ) {}

  ngOnInit(): void {
    this.user$
      .pipe(
        tap((item) => (this.id = item.id)),
        takeUntil(this.destroy$)
      )
      .subscribe();

    this.userForm = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
      username: ['', [Validators.required]],
      birthDate: [],
      project: [],
      post: [],
      about: [],
      admin: [],
    });

    this.user$.subscribe((att) => {
      for (var i in att) {
        if (i === 'birthDate') {
          if (att.birthDate != null) {
            this.userForm
              .get('birthDate')
              ?.setValue(
                new TuiDay(
                  new Date(att.birthDate).getFullYear(),
                  new Date(att.birthDate).getMonth(),
                  new Date(att.birthDate).getDate()
                )
              );
          }
        } else this.userForm.get(i)?.setValue(att[i as keyof UserInfo]);
      }
    });
  }

  onReject(file: TuiFileLike | readonly TuiFileLike[]): void {
    this.rejectedFiles$.next(file as TuiFileLike);
  }
  makeRequest(file: TuiFileLike): Observable<TuiFileLike | null> {
    this.loadingFiles$.next(file);

    return timer(1000).pipe(
      map(() => {
        if (Math.random() > 0.5) {
          return file;
        }

        this.rejectedFiles$.next(file);

        return null;
      }),
      finalize(() => this.loadingFiles$.next(null))
    );
  }
  removeFile(): void {
    this.control.setValue(null);
  }

  clearRejected(): void {
    this.removeFile();
    this.rejectedFiles$.next(null);
  }

  saveUser() {
    if (
      this.userForm.get('username')?.invalid ||
      this.userForm.get('email')?.invalid
    ) {
      this.errors = true;
    } else {
      if (this.loading == false) this.loading = true;
      const user: UserInfo = {
        id: this.id,
        username: this.userForm.value.username,
        birthDate:
          this.userForm.value.birthDate != null
            ? new Date(
                this.userForm.value.birthDate.year,
                this.userForm.value.birthDate.month,
                this.userForm.value.birthDate.day
              )
            : null,
        email: this.userForm.value.email,
        project: this.userForm.value.project,
        post: this.userForm.value.post,
        admin: this.userForm.value.admin,
        about: this.userForm.value.about,
        photo: this.control.value,
      };

      const processId = nextProcessId + 1;

      this.actions$
        .pipe(
          ofType(editUser),
          filter((action) => action.processId === processId)
        )
        .subscribe(() => {
          return this.router.navigate(['/user/' + user.id]);
        });

      this.store$.dispatch(editUser({ user: user, processId: processId }));
      this.errors = false;
    }
  }
  ngOnDestroy(): void {
    this.loading = false;
  }
}
