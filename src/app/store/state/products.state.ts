import { ProductCategory } from './../../models/productsCategory';
import { Product } from './../../models/product';
export interface ProductsState {
  productsCategories: ProductCategory[] | null;
  orderedProducts: Product[] | null;
  selectedProduct: Product | null;
  file: Blob | null
}

export const initialProductsState: ProductsState = {
  productsCategories: null,
  orderedProducts: null,
  selectedProduct: null,
  file: null
};
