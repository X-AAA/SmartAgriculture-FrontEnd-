import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = false;

  constructor() { }

  login(credentials: { username: string, password: string }): Observable<boolean> {
    // Implement authentication logic with your backend API
    this.isAuthenticated = true;
    localStorage.setItem('accessToken', 'dummy_token'); // Replace with actual token from backend
    return of(true);
  }

  getAuthToken(): string | null {
    return localStorage.getItem('accessToken');
  }

  logout(): void {
    this.isAuthenticated = false;
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }
}
