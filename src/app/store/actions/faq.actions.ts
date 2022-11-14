import { Faq } from './../../models/faq';
import { createAction, props } from '@ngrx/store';
import { Category } from 'src/app/models/category';

// список всех вопросов
export const getFaq = createAction('[Faq Page] Get Faq');
// список всех категорий
export const getCategories = createAction('[Faq Page] Get Categories');

export const setFaq = createAction(
  '[Faq Page] Set Faq',
  props<{ faqList: Faq[] }>()
);
export const setCategories = createAction(
  '[Faq Page] Set Categories',
  props<{ categories: Category[] }>()
);
//добавить новоый вопрос
export const addNewFaq = createAction(
  '[Faq Page] Add New Faq',
  props<{ faq: Faq }>()
);
export const addNewFaqSuccess = createAction(
  '[Faq Page] Add New Faq Succes',
  props<{ faq: Faq }>()
);
//добавить новую категорию
export const addNewCategory = createAction(
  '[Faq Page] Add New Categories',
  props<{ name: string }>()
);
export const addNewCategorySuccess = createAction(
  '[Faq Page] Add New Category Succes',
  props<{ name: string }>()
);
