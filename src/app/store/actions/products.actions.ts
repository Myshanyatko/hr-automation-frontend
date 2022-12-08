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
// список заказанных продуктов
export const getOrderedProducts = createAction(
  '[Products Page] Get Ordered Products'
);

export const setOrderedProducts = createAction(
  '[Products Page] Set Ordered Products',
  props<{ orderedProducts: Product[] }>()
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

//добавить новоый продукт
export const editProduct = createAction(
  '[Products Page] Edit Product',
  props<{ product: Product; processId: number }>()
);
export const editProductSuccess = createAction(
  '[Products Page] Edit Product Success',
  props<{ processId: number }>()
);

//запрошенный продукт
export const getProduct = createAction(
  '[Products Page] Get Product',
  props<{ id: number }>()
);
export const setProduct = createAction(
  '[Products Page] Set Product',
  props<{ product: Product }>()
);

//удалить продукт
export const deleteProduct = createAction(
  '[Products Page] Delete Product',
  props<{ id: number,  categoryId: number }>()
);
export const deleteProductSuccess = createAction(
  '[Products Page] Delete Product Success',
  props<{ id: number,  categoryId: number }>()
);

//скачать файл
export const getFile = createAction(
  '[Products Page] Get File'
);
export const getFileSuccess = createAction(
  '[Products Page] Get File',
  props<{ file: Blob}>()
);
// удалить заказанный продукт
export const deleteOrderedProduct = createAction(
  '[Products Page] Delete Ordered Product',
  props<{ id: number}>()
);
export const deleteOrderedProductSuccess = createAction(
  '[Products Page] Delete Ordered Product Success',
  props<{ id: number}>()
);
