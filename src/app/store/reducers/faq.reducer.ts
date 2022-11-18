import { Category } from 'src/app/models/category';
import { filter } from 'rxjs/operators';
import { initialFaqState } from './../state/faq.state';
import {
  setFaq,
  addNewFaqSuccess,
  addNewCategorySuccess,
  setCategories,
  deleteFaqSuccess,
} from './../actions/faq.actions';
import { createReducer, on } from '@ngrx/store';
import { state } from '@angular/animations';

export const faqReducer = createReducer(
  initialFaqState,
  on(setFaq, (state, { faqList }) => {
    return { ...state, faqList: faqList };
  }),
  on(setCategories, (state, { categories }) => {
    return { ...state, categories: categories };
  }),
  on(addNewFaqSuccess, (state, { faq }) => {
    return { ...state, faqList: [...state.faqList, faq] };
  }),
  on(deleteFaqSuccess, (state, { faqId, categoryId }) => {
    var category: Category;

    category = state.categories.find((cat) => cat.id === categoryId) || {
      id: -1,
      name: '',
      questions: [],
    };
    var questions = category?.questions.filter((faq) => faq.id != faqId);
    var category2 = {
      id: category.id,
      name: category.name,
      questions: questions,
    };
    return {
      ...state,
      categories: [
        ...state.categories.filter((cat) => cat.id != categoryId),
        category2,
      ],
    };
  })
);
