import { initialFaqState } from './../state/faq.state';
import {
  setFaq,
  addNewFaqSuccess,
  setCategories,
  deleteFaqSuccess,
  editFaq,
} from './../actions/faq.actions';
import { createReducer, on } from '@ngrx/store';

export const faqReducer = createReducer(
  initialFaqState,
  on(setFaq, (state, { faqList }) => {
    return { ...state, faqList: faqList };
  }),
  on(setCategories, (state, { categories }) => {
    return {
      ...state,
      categories: categories,
    };
  }),
  // on(addNewFaqSuccess, (state, { faq }) => {
  //   return { ...state, categories: [...state.categories, ] };
  // }),
  on(deleteFaqSuccess, (state, { faqId, categoryId }) => {
    const category = state.categories.find((cat) => cat.id === categoryId) || {
      id: -1,
      name: '',
      questions: [],
    };
    var questions = category?.questions.filter((faq) => faq.id != faqId);
    return {
      ...state,
      categories: [
        ...state.categories.filter((cat) => cat.id != categoryId),
        {
          id: category.id,
          name: category.name,
          questions: questions,
        },
      ].sort((a, b) => {
        if (a.name > b.name) {
          return 1;
        }

        if (a.name < b.name) {
          return -1;
        }

        return 0;
      }),
    };
  }),
  on(editFaq, (state, { faq }) => {
    return {
      ...state,
      editedFaq: faq,
    };
  })
);
