import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { ToastService } from '../services/toast.service';
import { Auth, GoogleAuthProvider, signInWithPopup } from '@angular/fire/auth'; // Asegúrate de importar Auth y GoogleAuthProvider

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  email: string = ''; // Email proporcionado por el usuario
  password: string = ''; // Contraseña proporcionada por el usuario

  constructor(private authService: AuthService, private router: Router, private toastService: ToastService, private auth: Auth) {}

  // Método para iniciar sesión con Google
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
        console.error('Código de error de Firebase:', error.code);

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
        } else if (error.code === 'auth/invalid-email') {
          const errorMessage = 'Los datos son incorrectos, volvé a intentar!';
          await this.toastService.showToast(errorMessage);
        } else {
          const errorMessage = error.message || 'Ocurrió un error durante el login';
          await this.toastService.showToast(errorMessage);
        }
      }
    }
  }
}
