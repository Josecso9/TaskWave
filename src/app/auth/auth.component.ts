import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {

  // Propiedades del componente para manejar el estado del formulario de autenticación.
  username: string = '';
  password: string = '';
  isLoginMode = true;
  isLoading = false;
  errorMessage: string | null = null;

  constructor(private authService: AuthService, private router: Router) { }

  // Método para alternar entre modos de inicio de sesión y registro.
  toggleMode() {
    this.isLoginMode = !this.isLoginMode;
    this.errorMessage = null;
  }

  onSubmit() {
    if (!this.username || !this.password) {
      this.errorMessage = 'Please enter both username and password';
      return;
    }

    this.isLoading = true;
    if (this.isLoginMode) {
      // Lógica para el modo de inicio de sesión.
      this.authService.login(this.username, this.password).subscribe({
        next: (response) => {
          console.log('Login successful', response);
          this.router.navigate(['/dashboard']);
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Login failed', error);
          this.errorMessage = 'Login failed. Please try again.';
          this.isLoading = false;
        }
      });
    } else {
      // Lógica para el modo de registro.
      this.authService.register(this.username, this.password).subscribe({
        next: (response) => {
          console.log('Registration successful', response);
          this.router.navigate(['/dashboard']);
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Registration failed', error);
          this.errorMessage = 'Registration failed. Please try again.';
          this.isLoading = false;
        }
      });
    }
  }
}