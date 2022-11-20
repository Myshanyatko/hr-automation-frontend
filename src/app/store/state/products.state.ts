import { Product } from './../../models/product';
export interface ProductsState {
  products: Product[];
}

export const initialProductsState: ProductsState = {
  products: [],
};
