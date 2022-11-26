export interface Product {
  id: number;
  code: string;
  name: string;
  photo: string | File | null;
  quantity: number;
  categoryId: number
}
