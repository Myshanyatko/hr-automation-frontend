import { Category } from 'src/app/models/category';
import { Faq } from './../../models/faq';
export interface FaqState {
  faqList: Faq[] | null;
  categories: Category[] | null;
  editedFaq: Faq | null;
}

export const initialFaqState: FaqState = {
  faqList: null,
  categories: null,
  editedFaq: null,
};
