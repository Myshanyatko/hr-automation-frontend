import { ProductCategory } from './../../models/productsCategory';
import { Product } from './../../models/product';
export interface ProductsState {
  productsCategories: ProductCategory[];
  orderedProducts: Product[];
  selectedProduct: Product | null
}

export const initialProductsState: ProductsState = {
  productsCategories: [],
  orderedProducts: [],
  selectedProduct: null
};
