import { authReducer } from './auth/auth.reducer';
import { AuthState } from './auth/auth.state';
import { ActionReducerMap } from '@ngrx/store';

export interface AppState {
  auth: AuthState;
}

export const appReducer: ActionReducerMap<AppState> = {
  auth: authReducer
};
