import {
  setProductsCategories,
  setOrderedProducts,
  setProduct,
  deleteProductSuccess,
} from './../actions/products.actions';
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
  on(deleteProductSuccess, (state, { id, categoryId }) => {
    const category = state.productsCategories.find(
      (cat) => cat.id === categoryId
    );
    var products = category?.products.filter((product) => product.id != id);
    const newProductsCategories = [
      ...state.productsCategories.filter((cat) => cat.id != categoryId),
    ];
    if (category && products) {
      newProductsCategories.push({
        id: category ? category.id : 1,
        name: category.name,
        products: products,
      });
    }
    newProductsCategories.sort((a, b) => {
      if (a.name > b.name) {
        return 1;
      }

      if (a.name < b.name) {
        return -1;
      }

      return 0;
    });
    return {
      ...state,
      productsCategories: newProductsCategories,
    };
  })
);
