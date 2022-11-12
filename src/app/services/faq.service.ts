import { Faq } from './../models/faq';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

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
  getFaqList() {
    return this.http.get<Faq[]>(API, {
      params: { pageNumber: 1, size: 5, sortBy: 'id' },
    });
  }
}
