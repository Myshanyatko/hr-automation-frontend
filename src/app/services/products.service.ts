import { ProductCategory } from './../models/productsCategory';
import { Product } from './../models/product';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const API = 'https://hr-automation-backend.onrender.com/products';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpClient) {}

  postProduct(product: Product) {
    return this.http.post(API + '/category/' + product.categoryId, {
      name: product.name,
      code: product.code,
      quantity: product.quantity,
      ordered: product.ordered,
    });
  }
  putProduct(product: Product) {
    return this.http.put(API + '/category/' + product.categoryId, {
      id: product.id,
      name: product.name,
      code: product.code,
      quantity: product.quantity,
      ordered: product.ordered,
    });
  }
  deleteProduct(id: number) {
    return this.http.delete(API + '/' + id);
  }
  
  deleteOrderedProduct(id: number) {
    return this.http.get(API + '/unorder/' + id);
  }
  getProductsCategories() {
    return this.http.get<ProductCategory[]>(API + '/categories');
  }
  getOrderedProducts() {
    return this.http.get<Product[]>(API + '/ordered');
  }
  getProduct(id: number) {
    return this.http.get<Product>(API + '/' + id);
  }
  getFile() {
    const type = 'blob' as 'json'
    return this.http.get<Blob>(API + '/excel',  { responseType: type});
  }
}
