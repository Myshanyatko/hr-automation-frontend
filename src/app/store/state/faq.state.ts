import { Category } from 'src/app/models/category';
import { Faq } from './../../models/faq';
export interface FaqState {
  faqList: Faq[] | null;
  categories: Category[] | null;
  editedFaq: Faq;
}

export const initialFaqState: FaqState = {
  faqList: null,
  categories: null,
  editedFaq: { id: 0, title: '', description: '', categoryId: 0 },
};
