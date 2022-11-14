import { FaqService } from './../../services/faq.service';
import {
  addNewFaq,
  getFaq,
  setFaq,
  getCategories,
  setCategories,
  addNewCategory,
  addNewCategorySuccess,
  addNewFaqSuccess,
} from './../actions/faq.actions';
import { Router } from '@angular/router';
import { DialogService } from './../../services/dialog.service';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { exhaustMap, mergeMap, catchError, EMPTY } from 'rxjs';
@Injectable()
export class FaqEffects {
  getfaqList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getFaq),
      mergeMap(() =>
        this.faqService.getFaqList().pipe(
          map((faqList) => setFaq({ faqList: faqList })),
          catchError((err) => {
            this.dialogService.showDialog(err.message).subscribe();
            return EMPTY;
          })
        )
      )
    )
  );
  getCategories$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getCategories),
      mergeMap(() =>
        this.faqService.getCategories().pipe(
          map((category) => setCategories({ categories: category })),
          catchError((err) => {
            this.dialogService.showDialog(err.message).subscribe();
            return EMPTY;
          })
        )
      )
    )
  );

  AddNewFaq$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addNewFaq),
      exhaustMap((action) =>
        this.faqService.postFaq(action.faq).pipe(
          map(() => {
            this.dialogService.showDialog('Новый вопрос добавлен').subscribe();
            this.router.navigate(['faq-list']);
            return addNewFaqSuccess({ faq: action.faq });
          }),
          catchError((err) => {
            this.dialogService.showDialog(err.message).subscribe();
            return EMPTY;
          })
        )
      )
    )
  );
  AddNewCategory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addNewCategory),
      exhaustMap((action) =>
        this.faqService.postCategory(action.name).pipe(
          map(() => {
            this.dialogService
              .showDialog('Новая категория добавлена')
              .subscribe();

            this.router.navigate(['faq']);
            return addNewCategorySuccess({ name: action.name });
          }),
          catchError((err) => {
            this.dialogService.showDialog(err.message).subscribe();
            return EMPTY;
          })
        )
      )
    )
  );
  constructor(
    private actions$: Actions,
    private dialogService: DialogService,
    private router: Router,
    private faqService: FaqService
  ) {}
}
