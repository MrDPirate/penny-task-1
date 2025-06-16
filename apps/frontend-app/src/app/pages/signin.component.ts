import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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
  errorMessage = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.route.queryParams.subscribe((params) => {
      if (params['authError']) {
        this.errorMessage = 'يجب تسجيل الدخول أولاً للوصول إلى الصفحة.';
      }
    });
  }

  goToSignup(): void {
    this.errorMessage = '';
    this.router.navigate(['/signup']);
  }
  
  goToForgotPassword(): void {
    this.router.navigate(['/forgot-password']);
  }

  onSubmit(): void {
    this.authService
      .signin({ email: this.email, password: this.password })
      .subscribe({
        next: (res) => {
          this.authService.saveToken(res.access_token);
          this.router.navigate(['/dashboard']);
        },
        error: (err) => {
          console.error(err);
          this.errorMessage = 'فشل تسجيل الدخول. تأكد من البيانات.';
        },
      });
  }
}
