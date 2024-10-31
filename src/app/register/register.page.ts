import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ToastService } from '../services/toast.service';

/**
 * Componente de la página de registro.
 * Permite a los nuevos usuarios ingresar sus datos para registrarse en la aplicación.
 * 
 * @component
 */
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
   * Nombre proporcionado por el usuario para el registro.
   * @type {string}
   */
  nombre: string = '';

  /**
   * Apellido proporcionado por el usuario para el registro.
   * @type {string}
   */
  apellido: string = '';

  /**
   * Teléfono proporcionado por el usuario para el registro.
   * @type {string}
   */
  telefono: string = '';

  /**
   * Crea una instancia del componente RegisterPage.
   * 
   * @param {AuthService} authService - Servicio de autenticación para manejar el registro de usuarios.
   * @param {ToastService} toastService - Servicio para mostrar mensajes de toast al usuario.
   */
  constructor(private authService: AuthService, private toastService: ToastService) {}

  /**
   * Método asíncrono para registrar un nuevo usuario.
   * 
   * Intenta registrar un nuevo usuario con los datos proporcionados.
   * Valida que todos los campos requeridos estén completos y maneja los errores que puedan surgir durante el proceso de registro.
   * 
   * @async
   * @function
   * @returns {Promise<void>} No retorna ningún valor, pero puede mostrar alertas en caso de error o éxito.
   * @throws {Error} Si ocurre un error durante el proceso de registro, se captura y se muestra un mensaje de error.
   */
  async register() {
    // Validar si el correo, la contraseña y otros campos han sido proporcionados
    if (!this.email || !this.password || !this.nombre || !this.apellido || !this.telefono) {
      const errorMessage = 'Ingrese todos los campos obligatorios';
      await this.toastService.showToast(errorMessage);
      return;
    }
  
    try {
      // Intentar registrar un nuevo usuario con el servicio de autenticación
      await this.authService.register(this.email, this.password, this.nombre, this.apellido, this.telefono);
      await this.toastService.showToast('Registro exitoso');
    } catch (error: any) {
      // Si hay un código de error de Firebase, se registra en la consola
      if (error.code) {
        console.error('Firebase error code:', error.code);

        // Mensajes específicos según el código de error
        if (error.code === 'auth/email-already-in-use') {
          const errorMessage = 'El email ya está registrado, iniciá sesión.';
          await this.toastService.showToast(errorMessage);
        } else if (error.code === 'auth/invalid-email') {
          const errorMessage = 'El email ingresado no es valido para registrar.';
          await this.toastService.showToast(errorMessage);
        } else {
          const errorMessage = error.message || 'Ocurrió un error durante el registro.';
          await this.toastService.showToast(errorMessage); // Mostrar el mensaje de error como toast
        }
      }
    }
  }
}
