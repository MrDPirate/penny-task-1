import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/auth';

  constructor(private http: HttpClient) {}

  signup(data: { username: string; email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/signup`, data);
  }

  signin(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/signin`, credentials);
  }

  saveToken(token: string): void {
    localStorage.setItem('access_token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('access_token');
  }

  logout(): void {
    localStorage.removeItem('access_token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  getProfile(): Observable<any> {
    const token = this.getToken();
    return this.http.get(`${this.apiUrl}/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  sendResetLink(email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/forgot-password`, { email });
  }
  
  resetPassword(token: string, newPassword: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/reset-password`, {
      token,
      newPassword,
    });
  }

  changePassword(oldPassword: string, newPassword: string): Observable<any> {
    const token = this.getToken();
    return this.http.post(`${this.apiUrl}/change-password`, {
      oldPassword,
      newPassword,
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
  }
  
  getAllUsers(): Observable<any[]> {
    const token = this.getToken();
    return this.http.get<any[]>(`${this.apiUrl}/users`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }
  
    
}