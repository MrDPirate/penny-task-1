import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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
  errorMessage = '';
  successMessage = '';
  token = '';

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router
  ) {
    this.token = this.route.snapshot.queryParamMap.get('token') || '';
  }

  onSubmit() {
    this.errorMessage = '';
    this.successMessage = '';

    if (this.newPassword !== this.confirmPassword) {
      this.errorMessage = 'كلمتا المرور غير متطابقتين.';
      return;
    }

    this.authService.resetPassword(this.token, this.newPassword).subscribe({
      next: () => {
        this.successMessage = 'تم إعادة تعيين كلمة المرور بنجاح.';
        setTimeout(() => this.router.navigate(['/']), 2000);
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = 'حدث خطأ أثناء إعادة التعيين. تأكد من صحة الرابط.';
      },
    });
  }
}
