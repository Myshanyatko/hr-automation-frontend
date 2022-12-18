export interface Product {
  id: number;
  code: string;
  name: string;
  pictureUrl: string | null;
  quantity: number;
  categoryId: number;
  ordered: boolean;
}
