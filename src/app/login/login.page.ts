import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  
  /**
   * Email proporcionado por el usuario para el login.
   * @type {string}
   */
  email: string = '';

  /**
   * Contraseña proporcionada por el usuario para el login.
   * @type {string}
   */
  password: string = '';

  /**
   * Constructor que inyecta el servicio de autenticación.
   * 
   * @param {AuthService} authService - Servicio utilizado para realizar el login de usuarios.
   */
  constructor(private authService: AuthService) {}

 /**
 * Función asíncrona para iniciar sesión en la aplicación.
 * 
 * Este método valida si el usuario ha ingresado un correo electrónico y una contraseña. 
 * Luego, intenta iniciar sesión utilizando el servicio de autenticación (AuthService).
 * Si los campos de email o contraseña están vacíos, muestra una alerta al usuario.
 * En caso de error durante el proceso de inicio de sesión, se captura el error, se registra en la consola (si existe un código de error) y se muestra un mensaje de alerta con la descripción del error.
 *
 * @returns {Promise<void>} No retorna ningún valor, pero puede mostrar alertas en caso de error o éxito.
 * @throws {Error} Si ocurre un error en el proceso de autenticación, se captura y muestra al usuario un mensaje descriptivo.
 */
  async login() {
    // Verificar que el usuario haya completado tanto el email como la contraseña
    if (!this.email || !this.password) {
      alert('Please fill in both email and password');
      return;
    }
  
    try {
      // Intentar iniciar sesión con el servicio de autenticación
      await this.authService.login(this.email, this.password);
      alert('Login successful!');
    } catch (error: any) {
      // Si hay un código de error de Firebase, se registra en la consola
      if (error.code) {
        console.error('Firebase error code:', error.code);
      }
      // Mostrar un mensaje de error al usuario
      const errorMessage = error.message || 'An error occurred during login.';
      alert(errorMessage);
    }
  }
}