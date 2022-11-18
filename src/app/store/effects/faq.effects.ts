import { AlertService } from './../../services/alert.service';
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
  deleteFaq,
  deleteFaqSuccess,
  editFaq,
  putFaq,
  putFaqSuccess,
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
            this.alert.showNotificationError(err.message).subscribe();
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
            this.alert.showNotificationError(err.message).subscribe();
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
            this.alert.showNotificationSuccess('Ответ добавлен').subscribe();
            this.router.navigate(['faq-list']);
            return addNewFaqSuccess({ faq: action.faq });
          }),
          catchError((err) => {
            this.alert.showNotificationError(err.message).subscribe();
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
            this.alert
              .showNotificationSuccess('Новая категория добавлена')
              .subscribe();

            this.router.navigate(['faq']);
            return addNewCategorySuccess({ name: action.name });
          }),
          catchError((err) => {
            this.alert.showNotificationError(err.message).subscribe();
            return EMPTY;
          })
        )
      )
    )
  );
  deleteFaq$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteFaq),
      exhaustMap((action) =>
        this.faqService.deleteFaq(action.faqId).pipe(
          map(() => {
            this.alert.showNotificationSuccess('Ответ удален').subscribe();

            return deleteFaqSuccess({
              faqId: action.faqId,
              categoryId: action.categoryId,
            });
          }),
          catchError((err) => {
            this.alert.showNotificationError(err.message).subscribe();
            return EMPTY;
          })
        )
      )
    )
  );
  putFaq$ = createEffect(() =>
    this.actions$.pipe(
      ofType(putFaq),
      exhaustMap((action) =>
        this.faqService.editFaq(action.faq).pipe(
          map(() => {
            this.alert.showNotificationSuccess('Данные сохранены').subscribe();
            this.router.navigate(['/faq-list']);
            return putFaqSuccess({
              faq: action.faq,
            });
          }),
          catchError((err) => {
            this.alert.showNotificationError(err.message).subscribe();
            return EMPTY;
          })
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private router: Router,
    private faqService: FaqService,
    private alert: AlertService
  ) {}
}
