import { Routes } from '@angular/router';
import { SigninComponent } from './pages/signin.component';
import { DashboardComponent } from './pages/dashboard.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: SigninComponent,
  },
  {
    path: 'signup',
    loadComponent: () =>
      import('./pages/signup.component').then(m => m.SignupComponent),
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuard],
  },
];
