import { Component } from '@angular/core';
import { AuthService} from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  constructor(private authService: AuthService, private router: Router) {}

  async logout() {
    try {
      await this.authService.logout(); // Implementa este método en AuthService
      this.router.navigate(['/login']); // Redirigir a la pantalla de login
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      alert('Ocurrió un error al cerrar sesión');
    }
  }

  ionViewWillEnter() {
    // Verificar si el usuario está autenticado
    if (!this.authService.isLoggedIn()) {
      // Redirigir al login si no está autenticado
      this.router.navigate(['/login']);
    }
  }
}


