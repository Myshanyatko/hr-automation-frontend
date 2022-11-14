import { Faq } from './faq';

export interface Category {
  id: number;
  name: string;
  questions: Faq[];
}
