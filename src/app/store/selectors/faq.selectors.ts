import { FaqState } from './../state/faq.state';
import { createSelector } from '@ngrx/store';
import { AppState } from './../state/app.state';
const selectFaq = (state: AppState) => state.faq;

export const selectFaqList = createSelector(
  selectFaq,
  (state: FaqState) => state.faqList
);
