import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { changePassword } from '../../actions/auth/auth.actions';
import {
  selectLoading,
  selectError,
  selectSuccessMessage,
} from '../../selectors/auth/auth.selectors';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css'],
})
export class ChangePasswordComponent implements OnInit {
  oldPassword = '';
  newPassword = '';

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
    if (!this.oldPassword || !this.newPassword) return;
    this.store.dispatch(
      changePassword({
        oldPassword: this.oldPassword,
        newPassword: this.newPassword,
      })
    );
  }
}
