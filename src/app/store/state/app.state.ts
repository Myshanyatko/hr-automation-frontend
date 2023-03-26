import { EventsState, initialEventsState } from './events.state';
import { RestaurantsState, initialRestaurantsState } from './restaurants.state';
import { AuthState, initialAuthState } from './auth.state';
import { ProductsState, initialProductsState } from './products.state';
import { initialFaqState, FaqState } from './faq.state';
import { UserState, initialUserState } from './users.state';
export interface AppState {
  users: UserState;
  faq: FaqState;
  products: ProductsState;
  auth: AuthState;
  restaurants: RestaurantsState;
  events: EventsState;
}
export const initialAppState: AppState = {
  users: initialUserState,
  faq: initialFaqState,
  products: initialProductsState,
  auth: initialAuthState,
  restaurants: initialRestaurantsState,
  events: initialEventsState,
};
export function getInitialState(): AppState {
  return initialAppState;
}
