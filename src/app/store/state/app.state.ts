import { initialFaqState, FaqState } from './faq.state';
import { UserState, initialUserState } from './users.state';
export interface AppState {
  users: UserState;
  faq: FaqState;
}
export const initialAppState: AppState = {
  users: initialUserState,
  faq: initialFaqState,
};
export function getInitialState(): AppState {
  return initialAppState;
}
