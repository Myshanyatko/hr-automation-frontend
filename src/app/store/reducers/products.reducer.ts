import { setProductsCategories, setOrderedProducts, setProduct } from './../actions/products.actions';
import { initialProductsState } from './../state/products.state';
import { createReducer, on } from '@ngrx/store';

export const productsReducer = createReducer(
  initialProductsState,
  on(setProductsCategories, (state, { productsCategories }) => {
    return { ...state, productsCategories: productsCategories };
  }),
  on(setOrderedProducts, (state, { orderedProducts }) => {
    return { ...state, orderedProducts: orderedProducts };
  }),
  on(setProduct, (state, { product }) => {
    return { ...state, selectedProduct: product };
  }),
  
 
);
