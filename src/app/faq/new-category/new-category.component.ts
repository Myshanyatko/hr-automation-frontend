import { filter, tap } from 'rxjs/operators';
import { Actions, ofType } from '@ngrx/effects';
import {
  addNewCategory,
  addNewCategorySuccess,
} from './../../store/actions/faq.actions';
import { AppState } from 'src/app/store/state/app.state';
import { Store } from '@ngrx/store';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { pipe } from 'rxjs';
import { Router } from '@angular/router';

let nextProcessId = 1;

@Component({
  selector: 'app-new-category',
  templateUrl: './new-category.component.html',
  styleUrls: ['./new-category.component.css'],
})
export class NewCategoryComponent implements OnInit, OnDestroy {
  categoryForm!: FormGroup;
  loading = false;
  
  constructor(
    private actions$: Actions,
    private fb: FormBuilder,
    private router: Router,
    private store$: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.categoryForm = this.fb.group({
      name: ['', [Validators.required]],
    });
  }
  saveCategory() {
    if (this.loading == false) this.loading = true;
    const processId = nextProcessId + 1;

    this.actions$.subscribe(() =>
      pipe(
        ofType(addNewCategorySuccess),
        filter((action) => action.processId === processId),
        tap(() => {
          return this.router.navigate(['faq']);
        })
      )
    );
    this.store$.dispatch(
      addNewCategory({
        name: this.categoryForm.value.name,
        processId: processId,
      })
    );
  }
  ngOnDestroy(): void {
    this.loading = false;
  }
}
