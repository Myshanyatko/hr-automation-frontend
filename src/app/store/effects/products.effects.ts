import {
  setProductsCategories,
  addNewProduct,
  addNewProductSuccess,
} from './../actions/products.actions';
import { ProductsService } from './../../services/products.service';
import { AlertService } from './../../services/alert.service';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { exhaustMap, mergeMap, catchError, EMPTY, tap } from 'rxjs';
import { getProductsCategories } from '../actions/products.actions';
@Injectable()
export class ProductsEffects {
  getProductsCatgories$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getProductsCategories),
      mergeMap(() =>
        this.productsService.getProductsCategories().pipe(
          map((res) => setProductsCategories({ productsCategories: res })),
          catchError((err) => {
            this.alert.showNotificationError(err.error).subscribe();
            return EMPTY;
          })
        )
      )
    )
  );

  addNewProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addNewProduct),
      exhaustMap(({ processId, product }) =>
        this.productsService.postProduct(product).pipe(
          map(() => {
            return addNewProductSuccess({
              processId: processId,
              product: product,
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
  addNewProductSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(addNewProductSuccess),
        tap(() => {
          this.alert.showNotificationSuccess('Продукт создан').subscribe();
         
        })
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private router: Router,
    private productsService: ProductsService,
    private alert: AlertService
  ) {}
}
