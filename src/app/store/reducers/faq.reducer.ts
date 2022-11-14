import { initialFaqState } from './../state/faq.state';
import {
  setFaq,
  addNewFaqSuccess,
  addNewCategorySuccess,
  setCategories,
} from './../actions/faq.actions';
import { createReducer, on } from '@ngrx/store';

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
  })
  // on(addNewCategorySuccess, (state, { name }) => {
  //   return { ...state, categories: [...state.categories, category] };
  // })
);
