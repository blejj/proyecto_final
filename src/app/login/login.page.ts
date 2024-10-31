import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { ToastService } from '../services/toast.service';
import { Auth, GoogleAuthProvider, signInWithPopup } from '@angular/fire/auth';

/**
 * Componente de la página de inicio de sesión.
 * Permite a los usuarios ingresar su email y contraseña para autenticarse en la aplicación.
 * 
 * @component
 */
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
   * Crea una instancia del componente LoginPage.
   * 
   * @param {AuthService} authService - Servicio de autenticación para manejar el inicio de sesión.
   * @param {Router} router - Router de Angular para la navegación entre páginas.
   * @param {ToastService} toastService - Servicio para mostrar mensajes de toast al usuario.
   */
  constructor(private authService: AuthService, private router: Router, private toastService: ToastService, private auth: Auth) {}


  /**
 * Inicia sesión con Google utilizando un popup.
 * 
 * Este método crea un nuevo proveedor de Google y trata de autenticar al usuario.
 * Si el inicio de sesión es exitoso, redirige al usuario a la página principal.
 * Si ocurre un error, muestra un mensaje de error.
 * 
 * @async
 * @function
 * 
 * @throws {Error} Lanza un error si ocurre un problema durante el inicio de sesión.
 * 
 */
  async loginWithGoogle() {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(this.auth, provider); // Asegúrate de pasar 'this.auth' aquí
      console.log('Usuario logueado con Google:', result.user);
      // Redirigir después del inicio de sesión exitoso si es necesario
      this.router.navigate(['/tabs']); 
    } catch (error) {
      console.error('Error al iniciar sesión con Google:', error);
      await this.toastService.showToast('Error al iniciar sesión con Google. Inténtalo de nuevo.'); // Usar el servicio de Toast
    }
  }

  /**
   * Intenta iniciar sesión con las credenciales proporcionadas.
   * Valida que los campos no estén vacíos y maneja los errores que puedan surgir durante el proceso de autenticación.
   * 
   * @async
   * @function
   * @returns {Promise<void>} - Promesa que se resuelve cuando el proceso de inicio de sesión se completa.
   */
  async login() {
    // Validar que se ingresen email y contraseña
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
    
        // Mensajes específicos según el código de error
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