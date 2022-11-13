import { Category } from 'src/app/models/category';
import { Faq } from './../../models/faq';
export interface FaqState {
  faqList: Faq[];
  categories: Category[];
}

export const initialFaqState: FaqState = {
  faqList: [],
  categories: [],
};
