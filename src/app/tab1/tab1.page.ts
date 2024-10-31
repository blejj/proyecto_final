import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

/**
 * Componente de la pestaña 1.
 * Proporciona navegación a las páginas de perros perdidos y perros encontrados.
 * 
 * @component
 */
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})

export class Tab1Page {

  /**
   * Crea una instancia del componente Tab1Page.
   * 
   * @param {Router} router - Router de Angular para la navegación entre páginas.
   * @param {AuthService} authService - Servicio de autenticación para verificar el estado de sesión del usuario.
   */
  constructor(private router: Router, private authService: AuthService) {}

  /**
   * Navega a la página de perros perdidos.
   * 
   * @function
   * @returns {void}
  */
  navegarAPerrosPerdidos() {
    this.router.navigate(['/perros-perdidos']);
  }

  /**
   * Navega a la página de perros encontrados.
   * 
   * @function
   * @returns {void} 
   */
  navegarAPerrosEncontrados() {
    this.router.navigate(['/perros-encontrados']);
  }

  /**
   * Verifica si el usuario está autenticado cada vez que la vista se va a mostrar.
   * Si el usuario no está autenticado, redirige a la página de login.
   * 
   * @function
   * @returns {void}
   */
  ionViewWillEnter() {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
    }
  }
}