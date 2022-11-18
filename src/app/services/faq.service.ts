import { Faq } from './../models/faq';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../models/category';

const API = 'http://localhost:8080/faq';

@Injectable({
  providedIn: 'root',
})
export class FaqService {
  constructor(private http: HttpClient) {}

  postFaq(faq: Faq) {
    return this.http.post(API + '/category/' + faq.categoryId, {
      title: faq.title,
      description: faq.description,
    });
  }
  postCategory(name: string) {
    console.log('postCategory = ' + name);

    return this.http.post(API + '/category', {
      name: name,
    });
  }
  getFaqList() {
    return this.http.get<Faq[]>(API, {
      params: { pageNumber: 1, size: 5, sortBy: 'id' },
    });
  }
  getCategories() {
    return this.http.get<Category[]>(API + '/categories');
  }
  deleteFaq(id: number) {
    return this.http.delete(API + '/' + id);
  }
  editFaq(faq: Faq) {
    return this.http.put(API + '/category/' + faq.categoryId, {
      id: faq.id,
      title: faq.title,
      description: faq.description,
    });
  }
}
