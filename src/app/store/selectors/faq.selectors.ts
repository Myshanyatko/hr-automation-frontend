import { FaqState } from './../state/faq.state';
import { createSelector } from '@ngrx/store';
import { AppState } from './../state/app.state';
const selectFaq = (state: AppState) => state.faq;

export const selectFaqList = createSelector(
  selectFaq,
  (state: FaqState) => state.faqList
);
export const selectCategories = createSelector(
  selectFaq,
  (state: FaqState) => state.categories
);
export const selectCategoriesName = createSelector(
  selectFaq,
  (state: FaqState) => state.categories.map((category) => category.name)
);
export const selectCategoriesId = createSelector(selectFaq, (state: FaqState) =>
  state.categories.map((category) => category.id)
);
export const selectEditedFaq = createSelector(
  selectFaq,
  (state: FaqState) => state.editedFaq
);
