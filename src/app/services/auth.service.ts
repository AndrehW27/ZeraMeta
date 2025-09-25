import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/auth'; // backend base URL

  constructor(private http: HttpClient) {}

  // Login
  login(email: string, senha: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { email, senha }).pipe(
      tap((res: any) => {
        if (res.token) {
          localStorage.setItem('token', res.token);
        }
      })
    );
  }

  // Register
  register(nome: string, email: string, senha: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/cadastro`, { nome, email, senha });
  }

  // Redefinir Senha
  redefinirSenha(email: string, novaSenha: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/redefinir-senha`, { email, novaSenha });
  }

    // Redefinir Senha por email
  redefinirSenhaPorEmail(email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/redefinir-senha-email`, { email });
  }

  // Logout
  logout(): void {
    localStorage.removeItem('token');
  }

  // Get token
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // Check login status
  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
