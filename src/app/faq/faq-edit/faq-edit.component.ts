import { Router, ActivatedRoute } from '@angular/router';
import { TuiDestroyService } from '@taiga-ui/cdk';
import { Actions, ofType } from '@ngrx/effects';
import { map, filter } from 'rxjs/operators';
import { selectEditedFaq } from './../../store/selectors/faq.selectors';
import { Faq } from './../../models/faq';
import { tap, takeUntil } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppState } from './../../store/state/app.state';
import { Store } from '@ngrx/store';
import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  OnDestroy,
} from '@angular/core';
import { getEditedFaq, putFaq, putFaqSuccess } from 'src/app/store/actions/faq.actions';

let nextProcessId = 1;
@Component({
  selector: 'app-faq-edit',
  templateUrl: './faq-edit.component.html',
  styleUrls: ['./faq-edit.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [TuiDestroyService],
})
export class FaqEditComponent implements OnInit, OnDestroy {
  errors = false;
  loading = false;
  faq$ = this.store$.select(selectEditedFaq);
  faqForm!: FormGroup;

  constructor(
    private actions$: Actions,
    private destroy$: TuiDestroyService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private store$: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.route.params
      .pipe(
        tap(({ id }) => {
          this.store$.dispatch(getEditedFaq({ id: Number(id) }));
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();

    this.faqForm = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
    });
    this.faq$.subscribe((faq) => {
      for (var i in faq) {
        this.faqForm.get(i)?.setValue(faq[i as keyof Faq]);
      }
    });
  }
  saveFaq() {
    if (
      this.faqForm.get('title')?.invalid ||
      this.faqForm.get('description')?.invalid
    ) {
      this.errors = true;
    } else {
      if (this.loading == false) this.loading = true;
      var idFaq = 0;
      var categoryIdFaq = 0;

      const faq = {
        id: idFaq,
        categoryId: categoryIdFaq,
        title: this.faqForm.value.title,
        description: this.faqForm.value.description,
      };
      const processId = nextProcessId + 1;
      this.faq$.pipe(
        map((faq) => {
          if (faq != null) {
            this.store$.dispatch(
              putFaq({
                faq: {
                  id: faq.id,
                  categoryId: faq.categoryId,
                  title: this.faqForm.value.title,
                  description: this.faqForm.value.description,
                },
                processId: processId
              })
            );
          }
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();
      this.errors = false;

      this.actions$
      .pipe(
        ofType(putFaqSuccess),
        filter((action) => action.processId === processId)
      )
      .subscribe(() => {
        this.router.navigate(['/faq-list']);
      });
    }
  }

  ngOnDestroy(): void {
    this.loading = false;
  }
}
