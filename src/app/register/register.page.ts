import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ToastService } from '../services/toast.service';

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

  constructor(private authService: AuthService, private toastService: ToastService) {}
  /**
   * Constructor que inyecta el servicio de autenticación.
   * 
   * @param {AuthService} authService - Servicio utilizado para realizar el registro de usuarios.
   */

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
      const errorMessage = 'Ingrese email y contraseña';
      await this.toastService.showToast(errorMessage);
      return;
    }
  
    try {
      // Intentar registrar un nuevo usuario con el servicio de autenticación
      await this.authService.register(this.email, this.password);
      alert('Registro exitoso');
    } catch (error: any) {
      // Si hay un código de error de Firebase, se registra en la consola
      if (error.code) {
        console.error('Firebase error code:', error.code);

        if(error.code === 'auth/email-already-in-use'){
          const errorMessage = 'El email ya está registrado, iniciá sesión.';
          await this.toastService.showToast(errorMessage);
        }
        else if(error.code === 'auth/invalid-email'){
          const errorMessage = 'El email ingresado no es valido para registar.';
          await this.toastService.showToast(errorMessage);
        }else{
          const errorMessage = error.message || 'Ocurrió un error durante el registro.';
          await this.toastService.showToast(errorMessage); // Mostrar el mensaje de error como toast
          // Mostrar un mensaje de error al usuario
        }
      }
      
    }
  }
}
