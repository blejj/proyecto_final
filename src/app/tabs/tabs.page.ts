import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

/**
 * Componente de la página de pestañas.
 * Sirve como contenedor para las diferentes pestañas de la aplicación.
 * 
 * @component
 */
@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  /**
   * Crea una instancia del componente TabsPage.
   * 
   * @param {AuthService} authService - Servicio de autenticación para manejar el estado del usuario.
   * @param {Router} router - Router de Angular para la navegación entre páginas.
   */
  constructor(private authService: AuthService, private router: Router) {}

}
