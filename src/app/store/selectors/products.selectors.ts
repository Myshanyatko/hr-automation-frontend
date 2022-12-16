import { ProductsState } from './../state/products.state';
import { createSelector } from '@ngrx/store';
import { AppState } from './../state/app.state';
const selectProducts = (state: AppState) => state.products

export const selectProductsCategories = createSelector(
  selectProducts,
  (state: ProductsState) => state.productsCategories
);
export const selectAllProducts = createSelector(
  selectProducts,
  (state: ProductsState) => state.products
);
export const selectOrderedProducts = createSelector(
  selectProducts,
  (state: ProductsState) => state.orderedProducts
);

export const selectSelectedProduct = createSelector(
  selectProducts,
  (state: ProductsState) => state.selectedProduct
)
export const selectFile = createSelector(
  selectProducts,
  (state: ProductsState) => state.file
)