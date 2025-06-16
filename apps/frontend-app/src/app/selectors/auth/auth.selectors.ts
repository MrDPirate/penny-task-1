import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from '../../reducers/auth/auth.reducer';

export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const selectUser = createSelector(
  selectAuthState,
  (state) => state.user
);

export const selectToken = createSelector(
  selectAuthState,
  (state) => state.token
);

export const selectLoading = createSelector(
  selectAuthState,
  (state) => state.loading
);

export const selectError = createSelector(
  selectAuthState,
  (state) => state.error
);

export const selectSuccessMessage = createSelector(
  selectAuthState,
  (state) => state.successMessage
);

export const selectIsAuthenticated = createSelector(
  selectToken,
  (token) => !!token
);
