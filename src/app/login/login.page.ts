import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

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

<<<<<<< HEAD
  constructor(private authService: AuthService, private router: Router ,private toastController: ToastController) {}
=======
  /**
   * Constructor que inyecta el servicio de autenticación.
   * 
   * @param {AuthService} authService - Servicio utilizado para realizar el login de usuarios.
   */
  constructor(private authService: AuthService) {}
>>>>>>> 9328de0bb882c9469f6fd0ba2b20f254c7b12aaa

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
      const errorMessage = 'Ingrese email y contraseña';
      await this.showToast(errorMessage);
      return;
    }
  
    try {
      // Intentar iniciar sesión con el servicio de autenticación
      await this.authService.login(this.email, this.password);
      // Redirige a la página de tabs después del login exitoso
      this.router.navigate(['/tabs']);
    } catch (error: any) {
      // Si hay un código de error de Firebase, se registra en la consola
      if (error.code) {
        console.error('Firebase error code:', error.code);
      }
<<<<<<< HEAD
      const errorMessage = error.message || 'Ocurrió un error durante el login';
      await this.showToast(errorMessage); // Mostrar el mensaje de error como toast
=======
      // Mostrar un mensaje de error al usuario
      const errorMessage = error.message || 'An error occurred during login.';
      alert(errorMessage);
>>>>>>> 9328de0bb882c9469f6fd0ba2b20f254c7b12aaa
    }
  }

  // Método para mostrar el toast
  async showToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000, // Duración del toast en milisegundos
      position: 'bottom', // Posición del toast en la pantalla
    });
    await toast.present();
  }
}