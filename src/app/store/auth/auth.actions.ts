// src/app/store/auth/auth.actions.ts
import { createAction } from '@ngrx/store';

export const login = createAction('[Auth] Login');
export const logout = createAction('[Auth] Logout');