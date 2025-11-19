import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class TaskApiService {

  private base = `${environment.apiUrl}/tasks`;

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<any[]>(this.base);
  }

  create(title: string) {
    return this.http.post<any>(this.base, { title });
  }

  toggle(id: string) {
    return this.http.put<any>(`${this.base}/${id}/toggle`, {});
  }

  delete(id: string) {
    return this.http.delete(`${this.base}/${id}`);
  }
}
