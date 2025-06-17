import { createReducer, on } from '@ngrx/store';
import * as AuthActions from '../../actions/auth/auth.actions';

export const authFeatureKey = 'auth';

export interface AuthState {
  user: any | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  successMessage: string | null;
  users: any[];

}
const storedToken = localStorage.getItem('access_token');

export const initialState: AuthState = {
  user: null,
  token: storedToken,
  loading: false,
  error: null,
  successMessage: null,
  users: [],
};

export const reducer = createReducer(
  initialState,

  // Login
  on(AuthActions.login, (state) => ({
    ...state,
    loading: true,
    error: null,
    successMessage: null,
  })),
  on(AuthActions.loginSuccess, (state, { token }) => ({
    ...state,
    loading: false,
    token,
  })),
  on(AuthActions.loginFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Signup
  on(AuthActions.signup, (state) => ({
    ...state,
    loading: true,
    error: null,
    successMessage: null,
  })),
  on(AuthActions.signupSuccess, (state, { message }) => ({
    ...state,
    loading: false,
    successMessage: message,
  })),
  on(AuthActions.signupFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Change Password
  on(AuthActions.changePassword, (state) => ({
    ...state,
    loading: true,
    error: null,
    successMessage: null,
  })),
  on(AuthActions.changePasswordSuccess, (state, { message }) => ({
    ...state,
    loading: false,
    successMessage: message,
  })),
  on(AuthActions.changePasswordFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Forgot Password - Send Link
  on(AuthActions.sendResetLink, (state) => ({
    ...state,
    loading: true,
    error: null,
    successMessage: null,
  })),
  on(AuthActions.sendResetLinkSuccess, (state, { message }) => ({
    ...state,
    loading: false,
    successMessage: message,
  })),
  on(AuthActions.sendResetLinkFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Reset Password
  on(AuthActions.resetPassword, (state) => ({
    ...state,
    loading: true,
    error: null,
    successMessage: null,
  })),
  on(AuthActions.resetPasswordSuccess, (state, { message }) => ({
    ...state,
    loading: false,
    successMessage: message,
  })),
  on(AuthActions.resetPasswordFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Logout
  on(AuthActions.logout, () => initialState),

  // List Users
  on(AuthActions.loadUsersSuccess, (state, { users }) => ({
    ...state,
    users,
    loading: false,
    error: null
  })),
  
  on(AuthActions.loadUsersFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
  
  
);
