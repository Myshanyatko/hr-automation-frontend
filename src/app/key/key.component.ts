import { TokenService } from './../services/token.service';
import { Actions, ofType } from '@ngrx/effects';
import { AppState } from './../store/state/app.state';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { key, keySuccess } from '../store/actions/auth.actions';

@Component({
  selector: 'app-key',
  templateUrl: './key.component.html',
  styleUrls: ['./key.component.css'],
})
export class KeyComponent implements OnInit, OnDestroy {
  keyForm!: FormGroup;
  loading = false;
  errors = false;

  constructor(
    private actions$: Actions,
    private tokenService: TokenService,
    private router: Router,
    private store$: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.keyForm = new FormGroup({
      key: new FormControl('', Validators.required),
    });
  }

  back() {
    this.router.navigate(['login']);
  }

  key() {
    if (this.keyForm.get('key')?.invalid) {
      this.errors = true;
    } else {
      this.loading = true;
      this.store$.dispatch(
        key({
          key: this.keyForm.value.key,
          email: String(this.tokenService.getEmail()),
          callback: () => {
            this.loading = false;
          },
        })
      );
      this.errors = false;
    }
    this.actions$.pipe(ofType(keySuccess)).subscribe(() => {
      this.router.navigate(['/users']);
    });
  }
  ngOnDestroy() {
    this.loading = false;
  }
}
