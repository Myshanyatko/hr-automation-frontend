import { FaqService } from './../../services/faq.service';
import { addNewFaq, getFaq, setFaq } from './../actions/faq.actions';
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

  AddNewFaq$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addNewFaq),
      exhaustMap((action) =>
        this.faqService.postFaq(action.faq).pipe(
          map(() => {
            this.dialogService.showDialog('Новый вопрос добавлен').subscribe();
            this.router.navigate(['faq']);
            return addNewFaq({ faq: action.faq });
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
