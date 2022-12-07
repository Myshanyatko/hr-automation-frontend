import { Store } from '@ngrx/store';
import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  OnDestroy,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AppState } from '../store/state/app.state';
import { login } from '../store/actions/auth.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm!: FormGroup;
  loading = false;
  errors = false;
  constructor(private store$: Store<AppState>) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
    });
  }

  login() {
    if (this.loginForm.get('email')?.invalid) {
      this.errors = true;
    } else {
      this.loading = true;
      this.store$.dispatch(login({ email: this.loginForm.value.email }));
      this.errors = false;
    }
  }
  ngOnDestroy() {
    this.loading = false;
  }
}
