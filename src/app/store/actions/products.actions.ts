import { ProductCategory } from './../../models/productsCategory';
import { Product } from './../../models/product';
import { createAction, props } from '@ngrx/store';
import { Category } from 'src/app/models/category';

// список всех каегорий вопросов
export const getProductsCategories = createAction(
  '[Products Page] Get Products Categories'
);

export const setProductsCategories = createAction(
  '[Products Page] Set Products Categories',
  props<{ productsCategories: ProductCategory[] }>()
);

//добавить новоый продукт
export const addNewProduct = createAction(
  '[Products Page] Add New Product',
  props<{ product: Product; processId: number }>()
);
export const addNewProductSuccess = createAction(
  '[Products Page] Add New Product Success',
  props<{ product: Product; processId: number }>()
);
