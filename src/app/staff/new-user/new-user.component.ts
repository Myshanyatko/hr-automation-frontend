import { HttpClient } from '@angular/common/http';
import { TuiFileLike } from '@taiga-ui/kit';
import { filter, switchMap, map, finalize } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { UserInfo } from './../../models/userInfo';
import {
  addNewUser,
  addNewUserSuccess,
} from './../../store/actions/users.actions';
import { AppState } from 'src/app/store/state/app.state';
import { Store } from '@ngrx/store';
import {
  FormGroup,
  Validators,
  FormBuilder,
  FormControl,
} from '@angular/forms';
import { ChangeDetectionStrategy, Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, timer, Observable, of } from 'rxjs';
let nextProcessId = 1;

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewUserComponent implements OnInit, OnDestroy {
  createUserForm!: FormGroup;
  errors = false;
  loading = false;

  readonly control = new FormControl();
  readonly rejectedFiles$ = new Subject<TuiFileLike | null>();
  readonly loadingFiles$ = new Subject<TuiFileLike | null>();
  readonly loadedFiles$ = this.control.valueChanges.pipe(
    switchMap((file) => (file ? this.makeRequest(file) : of(null)))
  );

  constructor(
    private actions$: Actions,
    private fb: FormBuilder,
    private router: Router,
    private store$: Store<AppState>,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.createUserForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      birthDate: [],
      project: [''],
      post: [''],
      about: [''],
      admin: [false],
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
      this.createUserForm.get('name')?.invalid ||
      this.createUserForm.get('email')?.invalid
    ) {
      this.errors = true;
    } else {
      if (this.loading == false) this.loading = true;
      const user: UserInfo = {
        id: 0,
        photo: this.control.value,
        username: this.createUserForm.value.name,
        birthDate:
          this.createUserForm.value.birthDate != null
            ? new Date(
                this.createUserForm.value.birthDate.year,
                this.createUserForm.value.birthDate.month,
                this.createUserForm.value.birthDate.day
              )
            : null,
        email: this.createUserForm.value.email,
        project: this.createUserForm.value.project,
        post: this.createUserForm.value.post,
        admin: this.createUserForm.value.admin,
        about: this.createUserForm.value.about,
        pictureUrl: ''
      };

      const processId = nextProcessId + 1;
      this.actions$
        .pipe(
          ofType(addNewUserSuccess),
          filter((action) => action.processId === processId)
        )
        .subscribe(() => {
          return this.router.navigate(['/users']);
        });
        if(this.control.value != null){
          var fd = new FormData();
      fd.append('file', this.control.value);
      this.store$.dispatch(addNewUser({ user: user, photo: fd, processId: processId }));

        }
        else   this.store$.dispatch(addNewUser({ user: user, photo: null, processId: processId }));

      

      // оно здесь временно!!!
    //   this.http
    //     .post('https://hr-automation-backend.onrender.com/test', fd)
    //     .subscribe((res) => console.log(res));
        
    //     this.errors = false;
    }

    
  }
  ngOnDestroy(): void {
    this.loading = false;
  }
}
