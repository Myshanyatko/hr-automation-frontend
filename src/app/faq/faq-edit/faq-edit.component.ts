import { map } from 'rxjs/operators';
import { selectEditedFaq } from './../../store/selectors/faq.selectors';
import { Faq } from './../../models/faq';
import { Observable, take, tap } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppState } from './../../store/state/app.state';
import { Store } from '@ngrx/store';
import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { putFaq } from 'src/app/store/actions/faq.actions';

@Component({
  selector: 'app-faq-edit',
  templateUrl: './faq-edit.component.html',
  styleUrls: ['./faq-edit.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FaqEditComponent implements OnInit, OnDestroy {
  errors = false;
  loading = false;
  faq$ = this.store$.select(selectEditedFaq);
  faqForm!: FormGroup;
  title: string = '';
  descrip: string = '';

  constructor(private fb: FormBuilder, private store$: Store<AppState>) {}

  ngOnInit(): void {
    this.faq$.subscribe((faq) => (this.title = faq.title));
    this.faq$.subscribe((faq) => (this.descrip = faq.description));
    this.faqForm = this.fb.group({
      title: [this.title, [Validators.required]],
      description: [this.descrip, [Validators.required]],
    });
  }
  saveFaq() {
    if (
      this.faqForm.get('category')?.invalid ||
      this.faqForm.get('title')?.invalid ||
      this.faqForm.get('description')?.invalid
    ) {
      this.errors = true;
    } else {
      if (this.loading == false) this.loading = true;
      var idFaq = 0;
      var categoryIdFaq = 0;
      this.faq$
        .pipe(
          tap(({ id, categoryId }) => {
            (idFaq = Number(id)), (categoryIdFaq = Number(categoryId));
          })
        )
        .subscribe();
      const faq = {
        id: idFaq,
        categoryId: categoryIdFaq,
        title: this.faqForm.value.title,
        description: this.faqForm.value.description,
      };

      this.store$.dispatch(putFaq({ faq }));
      this.errors = false;
    }
  }

  ngOnDestroy(): void {
    this.loading = false;
  }
}
