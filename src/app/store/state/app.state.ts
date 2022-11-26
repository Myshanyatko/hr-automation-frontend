import { ProductsState, initialProductsState } from './products.state';
import { initialFaqState, FaqState } from './faq.state';
import { UserState, initialUserState } from './users.state';
export interface AppState {
  users: UserState;
  faq: FaqState;
  products: ProductsState
}
export const initialAppState: AppState = {
  users: initialUserState,
  faq: initialFaqState,
  products: initialProductsState
};
export function getInitialState(): AppState {
  return initialAppState;
}
