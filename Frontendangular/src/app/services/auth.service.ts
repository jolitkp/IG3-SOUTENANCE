import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://127.0.0.1:8000/api'; // Remplacez par l'URL de votre API Laravel

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    const body = {
      email: email,
      password: password
    };

    return this.http.post(`${this.apiUrl}/login`, body);
  }

  logout(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.getAccessToken()}`
    });

    return this.http.post(`${this.apiUrl}/logout-page`, null, { headers: headers });
  }

  refreshToken(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.getAccessToken()}`
    });

    return this.http.post(`${this.apiUrl}/refresh`, null, { headers: headers });
  }

  saveAccessToken(token: string): void {
    localStorage.setItem('access_token', token);
  }

  getAccessToken(): string {
    return localStorage.getItem('access_token') || '';
  }

  removeAccessToken(): void {
    localStorage.removeItem('access_token');
  }

  isLoggedIn(): boolean {
    return !!this.getAccessToken();
  }

  forgotPassword(email: string): Observable<any> {
    const formData = new FormData();
    formData.append('email', email);

    return this.http.post(`${this.apiUrl}/forgot-password`, formData)
  }

  getUserInfo() {

    return this.http.get<string[]>(`${this.apiUrl}/permission`)
  }

}

