import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {

  register(user: any) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  login(email: string, password: string): boolean {
    const saved = localStorage.getItem('user');
    if (!saved) return false;

    const user = JSON.parse(saved);

    const ok = user.email === email && user.password === password;

    if (ok) {
      localStorage.setItem('auth', 'true');
      return true;
    }

    return false;
  }

  logout() {
    localStorage.removeItem('auth');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('auth');
  }
}
