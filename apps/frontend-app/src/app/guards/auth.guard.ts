import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectIsAuthenticated } from '../selectors/auth/auth.selectors';
import { take, map } from 'rxjs';

export const authGuard: CanActivateFn = () => {
  const store = inject(Store);
  const router = inject(Router);

  return store.select(selectIsAuthenticated).pipe(
    take(1),
    map((isAuth) => {
      if (isAuth) return true;
      router.navigate(['/'], { queryParams: { authError: 'true' } });
      return false;
    })
  );
};
