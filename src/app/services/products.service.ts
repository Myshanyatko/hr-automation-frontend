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
     name: product.name, code: product.code, pictureUrl: product.photo
    });
  }

  getProductsCategories() {
    return this.http.get<ProductCategory[]>(
      API+'/categories'
    );
  }
}
