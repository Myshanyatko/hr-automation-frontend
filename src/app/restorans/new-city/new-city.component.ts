import {
  createCity,
  createCitySuccess,
} from './../../store/actions/restaurants.actions';
import { filter } from 'rxjs/operators';
import { AppState } from 'src/app/store/state/app.state';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { Component, OnInit } from '@angular/core';
let nextProcessId = 1;
@Component({
  selector: 'app-new-city',
  templateUrl: './new-city.component.html',
  styleUrls: ['./new-city.component.css'],
})
export class NewCityComponent implements OnInit {
  cityForm!: FormGroup;
  errors = false;
  loading = false;

  constructor(
    private actions$: Actions,
    private fb: FormBuilder,
    private router: Router,
    private store$: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.cityForm = this.fb.group({
      name: ['', [Validators.required]],
    });
  }

  saveCity() {
    if (this.cityForm.get('name')?.invalid) {
      this.errors = true;
    } else {
      if (this.loading == false) this.loading = true;
      const processId = nextProcessId + 1;

      this.store$.dispatch(
        createCity({
          city: this.cityForm.value.name,
          processId: processId,
        })
      );

      this.actions$
        .pipe(
          ofType(createCitySuccess),
          filter((action) => action.processId === processId)
        )
        .subscribe(() => {
          this.router.navigate(['/restaurants']);
        });
    }
  }
  ngOnDestroy(): void {
    this.loading = false;
  }
}
