import { inject } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import * as AuthActions from '../../actions/auth/auth.actions';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { switchMap, catchError, map, of, tap } from 'rxjs';

export class AuthEffects {
  private actions$ = inject(Actions);
  private authService = inject(AuthService);
  private router = inject(Router);

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      switchMap(({ email, password }) =>
        this.authService.signin({ email, password }).pipe(
          tap((res) => {
            console.log('✅ Received token:', res.access_token);
            this.authService.saveToken(res.access_token);
          }),
          map((res) =>
            AuthActions.loginSuccess({ token: res.access_token })
          ),
          catchError((err) =>
            of(
              AuthActions.loginFailure({
                error: err.error.message || 'Login failed',
              })
            )
          )
        )
      )
    )
  );

  loginRedirect$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loginSuccess),
        tap(() => this.router.navigate(['/dashboard']))
      ),
    { dispatch: false }
  );

  signup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.signup),
      switchMap(({ username, email, password }) =>
        this.authService.signup({ username, email, password }).pipe(
          map(() =>
            AuthActions.signupSuccess({
              message: 'تم إنشاء الحساب بنجاح! يمكنك تسجيل الدخول',
            })
          ),
          catchError((err) =>
            of(
              AuthActions.signupFailure({
                error: err.error.message || 'Signup failed',
              })
            )
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
            AuthActions.changePasswordSuccess({
              message: 'تم تغيير كلمة المرور بنجاح',
            })
          ),
          catchError((err) =>
            of(
              AuthActions.changePasswordFailure({
                error:
                  err.error.message || 'فشل تغيير كلمة المرور',
              })
            )
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
            AuthActions.sendResetLinkSuccess({
              message: 'تم إرسال الرابط إلى بريدك الإلكتروني',
            })
          ),
          catchError((err) =>
            of(
              AuthActions.sendResetLinkFailure({
                error: err.error.message || 'فشل في إرسال الرابط',
              })
            )
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
            AuthActions.resetPasswordSuccess({
              message: 'تم تعيين كلمة المرور الجديدة',
            })
          ),
          catchError((err) =>
            of(
              AuthActions.resetPasswordFailure({
                error:
                  err.error.message || 'فشل تعيين كلمة المرور',
              })
            )
          )
        )
      )
    )
  );

  loadUsers$ = createEffect(() =>
  this.actions$.pipe(
    ofType(AuthActions.loadUsers),
    switchMap(() =>
      this.authService.getAllUsers().pipe(
        map(users => AuthActions.loadUsersSuccess({ users })),
        catchError(err => of(AuthActions.loadUsersFailure({ error: err.message || 'فشل تحميل المستخدمين' })))
      )
    )
  )
);

}
