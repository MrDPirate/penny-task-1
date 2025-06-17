import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { login, loginFailure } from '../../actions/auth/auth.actions';
import { selectError, selectLoading } from '../../selectors/auth/auth.selectors';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthState } from '../../reducers/auth/auth.reducer';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent {
  email = '';
  password = '';
  errorMessage$: Observable<string | null>;
  loading$: Observable<boolean>;

  private store = inject(Store<{ auth: AuthState }>);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  constructor() {
    this.errorMessage$ = this.store.select(selectError);
    this.loading$ = this.store.select(selectLoading);

    this.route.queryParams.subscribe((params) => {
      if (params['authError']) {
        this.store.dispatch(
          loginFailure({ error: 'يجب تسجيل الدخول أولاً للوصول إلى الصفحة.' })
        );
      }
    });
  }

  goToSignup(): void {
    this.router.navigate(['/signup']);
  }

  goToForgotPassword(): void {
    this.router.navigate(['/forgot-password']);
  }

  onSubmit(): void {
    this.store.dispatch(login({ email: this.email, password: this.password }));
  }
}
