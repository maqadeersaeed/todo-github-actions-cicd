import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthApiService {

  private base = `${environment.apiUrl}/auth`;

  constructor(private http: HttpClient) {}

  register(data: any) {
    return this.http.post(`${this.base}/register`, data);
  }

  login(data: any) {
    return this.http.post<{ token: string }>(`${this.base}/login`, data)
      .pipe(
        tap(res => {
          localStorage.setItem('authToken', res.token);
        })
      );
  }

  logout() {
    localStorage.removeItem('authToken');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('authToken');
  }
}
