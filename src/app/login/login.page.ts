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
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router ,private toastController: ToastController) {}

  async login() {
    if (!this.email || !this.password) {
      const errorMessage = 'Ingrese email y contraseña';
      await this.showToast(errorMessage);
      return;
    }
  
    try {
      await this.authService.login(this.email, this.password);
      // Redirige a la página de tabs después del login exitoso
      this.router.navigate(['/tabs']);
    } catch (error: any) {
      if (error.code) {
        console.error('Firebase error code:', error.code);
      }
      const errorMessage = error.message || 'Ocurrió un error durante el login';
      await this.showToast(errorMessage); // Mostrar el mensaje de error como toast
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