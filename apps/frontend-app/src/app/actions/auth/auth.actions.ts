import { createAction, props } from '@ngrx/store';

// Login
export const login = createAction(
  '[Auth] Login',
  props<{ email: string; password: string }>()
);
export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<{ token: string; user: any }>()
);
export const loginFailure = createAction(
  '[Auth] Login Failure',
  props<{ error: string }>()
);

// Signup
export const signup = createAction(
  '[Auth] Signup',
  props<{ username: string; email: string; password: string }>()
);
export const signupSuccess = createAction(
  '[Auth] Signup Success',
  props<{ message: string }>()
);
export const signupFailure = createAction(
  '[Auth] Signup Failure',
  props<{ error: string }>()
);

// Change Password
export const changePassword = createAction(
  '[Auth] Change Password',
  props<{ oldPassword: string; newPassword: string }>()
);
export const changePasswordSuccess = createAction(
  '[Auth] Change Password Success',
  props<{ message: string }>()
);
export const changePasswordFailure = createAction(
  '[Auth] Change Password Failure',
  props<{ error: string }>()
);

// Forgot Password - Send Link
export const sendResetLink = createAction(
  '[Auth] Send Reset Link',
  props<{ email: string }>()
);
export const sendResetLinkSuccess = createAction(
  '[Auth] Send Reset Link Success',
  props<{ message: string }>()
);
export const sendResetLinkFailure = createAction(
  '[Auth] Send Reset Link Failure',
  props<{ error: string }>()
);

// Reset Password
export const resetPassword = createAction(
  '[Auth] Reset Password',
  props<{ token: string; newPassword: string }>()
);
export const resetPasswordSuccess = createAction(
  '[Auth] Reset Password Success',
  props<{ message: string }>()
);
export const resetPasswordFailure = createAction(
  '[Auth] Reset Password Failure',
  props<{ error: string }>()
);

// Logout
export const logout = createAction('[Auth] Logout');
