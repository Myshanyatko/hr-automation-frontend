import {
  setProductsCategories,
  addNewProduct,
  addNewProductSuccess,
  getOrderedProducts,
  setOrderedProducts,
  getProduct,
  setProduct,
  editProduct,
  editProductSuccess,
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
  getOrderedProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getOrderedProducts),
      mergeMap(() =>
        this.productsService.getOrderedProducts().pipe(
          map((res) => setOrderedProducts({ orderedProducts: res })),
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

  getProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getProduct),
      exhaustMap(({ id }) =>
        this.productsService.getProduct(id).pipe(
          map((res) => {
            return setProduct({
              product: res,
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

  editProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(editProduct),
      exhaustMap((action) =>
        this.productsService.putProduct(action.product).pipe(
          map(() => {
            return editProductSuccess({ processId: action.processId });
          }),
          catchError((err) => {
            this.alert.showNotificationError(err.error).subscribe();
            return EMPTY;
          })
        )
      )
    )
  );
  editProductSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(editProductSuccess),
        map(() =>
          this.alert.showNotificationSuccess('Изменения сохранены').subscribe()
        )
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
