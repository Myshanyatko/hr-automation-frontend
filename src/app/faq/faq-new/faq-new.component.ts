import { Router } from '@angular/router';
import { filter, tap } from 'rxjs/operators';
import { Actions, ofType } from '@ngrx/effects';
import { selectCategories } from './../../store/selectors/faq.selectors';
import {
  addNewFaq,
  getCategories,
  addNewFaqSuccess,
} from './../../store/actions/faq.actions';
import { AppState } from 'src/app/store/state/app.state';
import { Store } from '@ngrx/store';

import { Faq } from './../../models/faq';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { Component, OnInit } from '@angular/core';

let nextProcessId = 1;

@Component({
  selector: 'app-faq',
  templateUrl: './faq-new.component.html',
  styleUrls: ['./faq-new.component.css'],
})
export class FaqNewComponent implements OnInit {
  errors = false;
  faq!: Faq;
  faqForm!: FormGroup;
  cats = [
    { id: 1, name: '1' },
    { id: 2, name: '2' },
  ];
  categories$ = this.store$.select(selectCategories);

  constructor(
    private actions$: Actions,
    private fb: FormBuilder,
    private router: Router,
    private store$: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.store$.dispatch(getCategories());
    this.faqForm = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
    });

    this.categories$.subscribe((item) =>
      this.faqForm.addControl(
        'category',
        new FormControl(item[0], [Validators.required])
      )
    );
  }
  saveFaq() {
    if (
      this.faqForm.get('category')?.invalid ||
      this.faqForm.get('title')?.invalid ||
      this.faqForm.get('description')?.invalid
    ) {
      this.errors = true;
    } else {
      this.faq = {
        id: 0,
        title: this.faqForm.value.title,
        description: this.faqForm.value.description,
        categoryId: this.faqForm.value.category.id,
      };

      const processId = nextProcessId + 1;
      this.store$.dispatch(addNewFaq({ faq: this.faq, processId: processId }));
      this.errors = false;
      this.actions$
        .pipe(
          ofType(addNewFaqSuccess),
          filter((action) => action.processId === processId)
        )
        .subscribe(() => {
          return this.complete();
        });
    }
  }
  complete() {
    return this.router.navigate(['faq-list']);
  }
}
