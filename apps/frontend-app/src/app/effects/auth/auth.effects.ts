import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as AuthActions from '../../actions/auth/auth.actions';
import { AuthService } from '../../services/auth.service';
import { catchError, map, of, switchMap } from 'rxjs';

@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions, private authService: AuthService) {}

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      switchMap(({ email, password }) =>
        this.authService.signin({ email, password }).pipe(
          map((res) =>
            AuthActions.loginSuccess({ token: res.access_token, user: res.user })
          ),
          catchError((err) =>
            of(AuthActions.loginFailure({ error: err.error.message || 'Login failed' }))
          )
        )
      )
    )
  );

  signup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.signup),
      switchMap(({ username, email, password }) =>
        this.authService.signup({ username, email, password }).pipe(
          map(() =>
            AuthActions.signupSuccess({ message: 'تم إنشاء الحساب بنجاح! يمكنك تسجيل الدخول' })
          ),
          catchError((err) =>
            of(AuthActions.signupFailure({ error: err.error.message || 'Signup failed' }))
          )
        )
      )
    )
  );

  changePassword$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.changePassword),
      switchMap(({ oldPassword, newPassword }) =>
        this.authService.changePassword(oldPassword, newPassword).pipe(
          map(() =>
            AuthActions.changePasswordSuccess({ message: 'تم تغيير كلمة المرور بنجاح' })
          ),
          catchError((err) =>
            of(AuthActions.changePasswordFailure({ error: err.error.message || 'فشل تغيير كلمة المرور' }))
          )
        )
      )
    )
  );

  sendResetLink$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.sendResetLink),
      switchMap(({ email }) =>
        this.authService.sendResetLink(email).pipe(
          map(() =>
            AuthActions.sendResetLinkSuccess({ message: 'تم إرسال الرابط إلى بريدك الإلكتروني' })
          ),
          catchError((err) =>
            of(AuthActions.sendResetLinkFailure({ error: err.error.message || 'فشل في إرسال الرابط' }))
          )
        )
      )
    )
  );

  resetPassword$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.resetPassword),
      switchMap(({ token, newPassword }) =>
        this.authService.resetPassword(token, newPassword).pipe(
          map(() =>
            AuthActions.resetPasswordSuccess({ message: 'تم تعيين كلمة المرور الجديدة' })
          ),
          catchError((err) =>
            of(AuthActions.resetPasswordFailure({ error: err.error.message || 'فشل تعيين كلمة المرور' }))
          )
        )
      )
    )
  );
}
