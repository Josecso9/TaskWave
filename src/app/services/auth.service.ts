import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

// Define una interfaz para las respuestas de login que incluyen un token.
interface LoginResponse {
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:3000/api/auth';

  constructor(private http: HttpClient) {}

  // Método para iniciar sesión.
  login(username: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.baseUrl}/login`, { username, password }, {
      headers: { 'Content-Type': 'application/json' }
    }).pipe(
      tap(response => {
        if (response && response.token) {
          localStorage.setItem('userToken', response.token);
        }
      })
    );
  }

  // Método para crear usuario
  register(username: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, { username, password }, {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  // Método que verifica si el usuario está actualmente logueado.
  isLoggedIn(): boolean {
    return !!localStorage.getItem('userToken');
  }

  // Método para obtener el token de autenticación almacenado.
  getToken(): string | null {

    // Retorna el token almacenado en localStorage o null si no hay ninguno.
    return localStorage.getItem('userToken');
  }
}