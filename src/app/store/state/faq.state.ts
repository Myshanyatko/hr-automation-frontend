import { Category } from 'src/app/models/category';
import { Faq } from './../../models/faq';
export interface FaqState {
  faqList: Faq[] | null;
  categories: Category[];
  editedFaq: Faq;
}

export const initialFaqState: FaqState = {
  faqList: null,
  categories: [],
  editedFaq: { id: 0, title: '', description: '', categoryId: 0 },
};
