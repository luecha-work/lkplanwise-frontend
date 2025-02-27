// src/app/store/auth/auth.reducer.ts
import { createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';
import { AuthState, initialAuthState } from './auth.state';

export const authReducer = createReducer(
  initialAuthState,
  on(AuthActions.login, (state): AuthState => ({
    ...state,
    isLoggedIn: true
  })),
  on(AuthActions.logout, (state): AuthState => ({
    ...state,
    isLoggedIn: false
  }))
);