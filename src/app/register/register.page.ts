import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  /**
   * Email proporcionado por el usuario para el registro.
   * @type {string}
   */
  email: string = '';

  /**
   * Contraseña proporcionada por el usuario para el registro.
   * @type {string}
   */
  password: string = '';

  /**
   * Constructor que inyecta el servicio de autenticación.
   * 
   * @param {AuthService} authService - Servicio utilizado para realizar el registro de usuarios.
   */
  constructor(private authService: AuthService) {}

  /**
   * Método asíncrono para registrar un nuevo usuario.
   * 
   * Este método valida que el usuario haya proporcionado tanto el correo electrónico como la
   * contraseña. Si ambos campos están completos, intenta registrar al usuario utilizando el
   * servicio de autenticación. En caso de éxito, muestra una alerta indicando que el registro
   * fue exitoso. Si ocurre un error, se captura y muestra un mensaje de error.
   * 
   * @returns {Promise<void>} No retorna ningún valor, pero puede mostrar alertas en caso de error o éxito.
   * @throws {Error} Si ocurre un error durante el proceso de registro, se captura y se muestra un mensaje de error.
   */
  async register() {
    // Validar si el correo y la contraseña han sido proporcionados
    if (!this.email || !this.password) {
      alert('Please fill in both email and password');
      return;
    }
  
    try {
      // Intentar registrar un nuevo usuario con el servicio de autenticación
      await this.authService.register(this.email, this.password);
      alert('Registration successful!');
    } catch (error: any) {
      // Si hay un código de error de Firebase, se registra en la consola
      if (error.code) {
        console.error('Firebase error code:', error.code);
      }
      // Mostrar un mensaje de error al usuario
      const errorMessage = error.message || 'An error occurred during registration.';
      alert(errorMessage);
    }
  }
}
