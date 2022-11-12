import { Faq } from './../../models/faq';
export interface FaqState {
  faqList: Faq[];
}

export const initialFaqState: FaqState = {
  faqList: [],
};
