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
  getFiltredFaq,
  putFaq,
  putFaqSuccess,
  getEditedFaq,
  setEditedFaq,
} from './../actions/faq.actions';
import { Router } from '@angular/router';
import { DialogService } from './../../services/dialog.service';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { exhaustMap, mergeMap, catchError, EMPTY, tap } from 'rxjs';
@Injectable()
export class FaqEffects {
  getfaqList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getFiltredFaq),
      mergeMap((action) =>
        this.faqService.getFiltredFaq(action.name).pipe(
          map((res) => setFaq({ faqList: res })),
          catchError((err) => {
            this.alert.showNotificationError(err.error).subscribe();
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
            this.alert.showNotificationError(err.error).subscribe();
            return EMPTY;
          })
        )
      )
    )
  );

  addNewFaq$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addNewFaq),
      exhaustMap(({ processId, faq }) =>
        this.faqService.postFaq(faq).pipe(
          map(() => {
            return addNewFaqSuccess({ processId: processId, faq: faq });
          }),

          catchError((err) => {
            this.alert.showNotificationError(err.error).subscribe();
            return EMPTY;
          })
        )
      )
    )
  );
  addNewFaqSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(addNewFaqSuccess),
        tap(() =>
          this.alert.showNotificationSuccess('Ответ добавлен').subscribe()
        )
      ),
    { dispatch: false }
  );
  addNewCategory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addNewCategory),
      exhaustMap((action) =>
        this.faqService.postCategory(action.name).pipe(
          map(() => {
            this.router.navigate(['faq/faq-new']);
            return addNewCategorySuccess({
              name: action.name,
              processId: action.processId,
            });
          }),
          catchError((err) => {
            this.alert.showNotificationError(err.error).subscribe();
            return EMPTY;
          })
        )
      )
    )
  );
  addNewCategorySuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(addNewCategorySuccess),
        tap(() =>
          this.alert
            .showNotificationSuccess('Новая категория добавлена')
            .subscribe()
        )
      ),
    { dispatch: false }
  );
  deleteFaq$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteFaq),
      exhaustMap((action) =>
        this.faqService.deleteFaq(action.faqId).pipe(
          map(() => {
            return deleteFaqSuccess({
              faqId: action.faqId,
              categoryId: action.categoryId,
            });
          }),
          catchError((err) => {
            this.alert.showNotificationError(err.error).subscribe();
            return EMPTY;
          })
        )
      )
    )
  );
  deleteFaqSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(deleteFaqSuccess),
        tap(() =>
          this.alert.showNotificationSuccess('Ответ удален').subscribe()
        )
      ),
    { dispatch: false }
  );
  putFaq$ = createEffect(() =>
    this.actions$.pipe(
      ofType(putFaq),
      exhaustMap((action) =>
        this.faqService.editFaq(action.faq).pipe(
          map(() => {
            return putFaqSuccess({
              faq: action.faq,
              processId: action.processId 
            });
          }),
          catchError((err) => {
            this.alert.showNotificationError(err.error).subscribe();
            return EMPTY;
          })
        )
      )
    )
  );
  putFaqSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(putFaqSuccess),
        tap(() =>
          this.alert.showNotificationSuccess('Данные сохранены').subscribe()
        )
      ),
    { dispatch: false }
  );
  getEditedFaq$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getEditedFaq),
      exhaustMap((action) =>
        this.faqService.getEditedFaq(action.id).pipe(
          map((res) => {
            return  setEditedFaq({
              faq: res,
            })
          }),
          catchError((err) => {
            this.alert.showNotificationError(err.error).subscribe()
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
