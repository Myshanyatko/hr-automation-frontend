import { Faq } from './../../models/faq';
import { createAction, props } from '@ngrx/store';

// список всех вопросов
export const getFaq = createAction('[Faq Page] Get Faq');

export const setFaq = createAction(
  '[Faq Page] Set Faq',
  props<{ faqList: Faq[] }>()
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
