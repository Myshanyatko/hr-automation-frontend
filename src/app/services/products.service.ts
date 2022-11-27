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
    return this.http.post(API + '/category/' + product.categoryId, {product});
  }
  putProduct(product: Product) {
    return this.http.put(API + '/category/' + product.categoryId, {
   id: product.id,
   name: product.name,
   photo: product.photo,
   code: product.code,
   quantity: product.quantity,
   ordered: product.ordered
    });
  }

  getProductsCategories() {
    return this.http.get<ProductCategory[]>(
      API+'/categories'
    );
  }
  getOrderedProducts() {
    return this.http.get<Product[]>(
      API+'/ordered'
    );
  }
  getProduct(id: number) {
    return this.http.get<Product>(
      API+'/'+ id
    );
  }
}
