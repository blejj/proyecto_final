import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { ToastService } from '../services/toast.service';

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

  constructor(private authService: AuthService, private router: Router, private toastService: ToastService) {}

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
      await this.toastService.showToast(errorMessage);
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
        console.error('Codigo de error de Firebase:', error.code);
    
        // Verifica si el error es por contraseña incorrecta
        if (error.code === 'auth/wrong-password') {
          const errorMessage = 'La contraseña ingresada es incorrecta';
          await this.toastService.showToast(errorMessage);
        } else if (error.code === 'auth/user-not-found') {
          const errorMessage = 'No se encontró una cuenta con este correo';
          await this.toastService.showToast(errorMessage);
        } else if (error.code === 'auth/invalid-credential') {
          const errorMessage = 'Las credenciales proporcionadas no son válidas. Verifica tu correo y contraseña.';
          await this.toastService.showToast(errorMessage);
        } else if (error.code === 'auth/invalid-email'){
          const errorMessage = 'Los datos son incorrectos, volvé a intentar!';
          await this.toastService.showToast(errorMessage);
        }else {
          const errorMessage = error.message || 'Ocurrió un error durante el login';
          await this.toastService.showToast(errorMessage);
        }
      }
    }
  }

}