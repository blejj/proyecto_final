import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './services/auth.service';  // Ajusta la ruta a tu servicio de autenticación
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    // Verificar si el usuario está autenticado
    if (this.authService.isLoggedIn()) {
      return true; // Permitir acceso si el usuario está autenticado
    } else {
      // Redirigir al login si no está autenticado
      this.router.navigate(['/login']);
      return false;
    }
  }
}
