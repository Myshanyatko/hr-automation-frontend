import { setProductsCategories } from './../actions/products.actions';
import { initialProductsState } from './../state/products.state';
import { createReducer, on } from '@ngrx/store';

export const productsReducer = createReducer(
  initialProductsState,
  on(setProductsCategories, (state, { productsCategories }) => {
    return { ...state, productsCategories: productsCategories };
  }),
  
 
);
