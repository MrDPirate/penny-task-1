import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  username = '';
  email = '';
  password = '';
  errorMessage = '';
  successMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    this.authService
      .signup({ username: this.username, email: this.email, password: this.password })
      .subscribe({
        next: (res) => {
          this.successMessage = 'تم إنشاء الحساب بنجاح! يمكنك الآن تسجيل الدخول.';
          this.errorMessage = '';
          this.username = '';
          this.email = '';
          this.password = '';
          setTimeout(() => this.router.navigate(['/']), 2000);
        },
        error: (err) => {
          console.error(err);
          this.errorMessage = 'فشل إنشاء الحساب. البريد مستخدم؟';
          this.successMessage = '';
        },
      });
  }
}
