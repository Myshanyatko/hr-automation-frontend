import { initialFaqState } from './../state/faq.state';
import { setFaq, addNewFaqSuccess } from './../actions/faq.actions';
import { createReducer, on } from '@ngrx/store';

export const faqReducer = createReducer(
  initialFaqState,
  on(setFaq, (state, { faqList }) => {
    return { ...state, faqList: faqList };
  }),
  on(addNewFaqSuccess, (state, { faq }) => {
    return { ...state, faqList: [...state.faqList, faq] };
  })
);
