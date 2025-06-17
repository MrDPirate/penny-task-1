import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { resetPassword } from '../../actions/auth/auth.actions';
import {
  selectError,
  selectSuccessMessage,
  selectLoading,
} from '../../selectors/auth/auth.selectors';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
})
export class ResetPasswordComponent {
  newPassword = '';
  confirmPassword = '';
  passwordMismatch = false;
  token = '';

  loading$!: Observable<boolean>;
  error$!: Observable<string | null>;
  success$!: Observable<string | null>;

  constructor(
    private route: ActivatedRoute,
    private store: Store,
    private router: Router
  ) {
    this.token = this.route.snapshot.queryParamMap.get('token') || '';
    this.loading$ = this.store.select(selectLoading);
    this.error$ = this.store.select(selectError);
    this.success$ = this.store.select(selectSuccessMessage);
  }

  onSubmit(): void {
    if (!this.newPassword || !this.confirmPassword) return;

    if (this.newPassword !== this.confirmPassword) {
      this.passwordMismatch = true;
      return;
    }

    this.passwordMismatch = false;

    this.store.dispatch(
      resetPassword({ token: this.token, newPassword: this.newPassword })
    );

    this.newPassword = '';
    this.confirmPassword = '';
  }
}
