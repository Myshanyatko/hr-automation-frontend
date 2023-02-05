import { RestaurantsService } from './../../services/restaurants.service';
import { getRestaurants, setRestaurants } from './../actions/restaurants.actions';
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
  deleteProduct,
  deleteProductSuccess,
  getFile,
  getFileSuccess,
  deleteOrderedProduct,
  deleteOrderedProductSuccess,
  getProducts,
  setProducts,
  addOrderedProduct,
  addOrderedProductSuccess,
} from './../actions/products.actions';
import { ProductsService } from './../../services/products.service';
import { AlertService } from './../../services/alert.service';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { exhaustMap, mergeMap, catchError, EMPTY, tap } from 'rxjs';
import { getProductsCategories } from '../actions/products.actions';
@Injectable()
export class RestaurantsEffects {
  getRestaurants$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getRestaurants),
      mergeMap(() =>
        this.restaurantsService.getRestaurants().pipe(
          map((res) => setRestaurants({ restaurants: res })),
          catchError((err) => {
            this.alert.showNotificationError(err.error).subscribe();
            return EMPTY;
          })
        )
      )
    )
  );
  constructor(
    private actions$: Actions,
    private restaurantsService: RestaurantsService,
    private alert: AlertService
  ) {}
}
