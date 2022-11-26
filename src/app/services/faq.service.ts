import { Faq } from './../models/faq';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../models/category';

const API = 'https://hr-automation-backend.onrender.com/faq';

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
    return this.http.post(API + '/category', {
      name: name,
    });
  }
  getFaqList() {
    return this.http.get<any>(API, {
      params: { pageNumber: 1, size: 5, sortBy: 'id' },
    });
  }
  getCategories() {
    return this.http.get<Category[]>(
      'https://hr-automation-backend.onrender.com/faq/categories'
    );
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
