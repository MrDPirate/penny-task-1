import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
})
export class ForgotPasswordComponent {
  email = '';
  message = '';
  errorMessage = '';

  constructor(private authService: AuthService) {}

  onSubmit(): void {
    this.message = '';
    this.errorMessage = '';

    this.authService.sendResetLink(this.email).subscribe({
      next: (res) => {
        this.message = res.message || 'تم إرسال رابط إعادة التعيين.';
        this.email = '';
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'حدث خطأ أثناء الإرسال.';
      },
    });
  }
}
