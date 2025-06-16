import { Routes } from '@angular/router';
import { SigninComponent } from './pages/signin.component/signin.component';
import { DashboardComponent } from './pages/dashboard-component/dashboard.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: SigninComponent,
  },
  {
    path: 'signup',
    loadComponent: () =>
      import('./pages/signup.component/signup.component').then(m => m.SignupComponent),
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuard],
  },

  {
    path: 'forgot-password',
    loadComponent: () =>
      import('./pages/forgot-password.component/forgot-password.component').then((m) => m.ForgotPasswordComponent),
  },

  {
    path: 'reset-password',
    loadComponent: () =>
      import('./pages/reset-password.component/reset-password.component').then(m => m.ResetPasswordComponent)
  },
  
  {
    path: 'change-password',
    loadComponent: () =>
      import('./pages/change-password/change-password.component').then(
        (m) => m.ChangePasswordComponent
      ),
    canActivate: [authGuard],
  },
  
];
