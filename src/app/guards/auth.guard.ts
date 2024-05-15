import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  // Método que determina si una ruta puede ser activada.
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // Verifica si el usuario está logueado mediante el servicio de autenticación.
    
    if (this.authService.isLoggedIn()) {

      // Si el usuario está autenticado, permite la activación de la ruta.
      return true;
    } else {
      
      // Si el usuario no está autenticado, redirige al usuario a la página de inicio de sesión.
      this.router.navigate(['/login']);  // Redirect to login if not authenticated
      return false;
    }
  }
}