import { Product } from './product';
export interface ProductCategory {
  name: string;
  id: number;
  products: Product[];
}
