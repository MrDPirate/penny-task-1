import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { sendResetLink } from '../../actions/auth/auth.actions';
import {
  selectLoading,
  selectError,
  selectSuccessMessage,
} from '../../selectors/auth/auth.selectors';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
})
export class ForgotPasswordComponent implements OnInit {
  email = '';
  loading$!: Observable<boolean>;
  error$!: Observable<string | null>;
  success$!: Observable<string | null>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.loading$ = this.store.select(selectLoading);
    this.error$ = this.store.select(selectError);
    this.success$ = this.store.select(selectSuccessMessage);
  }

  onSubmit(): void {
    if (!this.email) return;

    this.store.dispatch(sendResetLink({ email: this.email }));
    this.email = '';
  }
}
