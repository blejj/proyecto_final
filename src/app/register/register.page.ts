import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private toastController: ToastController) {}

  async register() {
    if (!this.email || !this.password) {
      const errorMessage = 'Ingrese email y contraseña';
      await this.showToast(errorMessage);
      return;
    }
  
    try {
      await this.authService.register(this.email, this.password);
      alert('Registro exitoso');
    } catch (error: any) {
      if (error.code) {
        console.error('Firebase error code:', error.code);
      }
      const errorMessage = error.message || 'Ocurrió un error durante el registro.';
      await this.showToast(errorMessage); // Mostrar el mensaje de error como toast
    }
  }

  async showToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000, // Duración del toast en milisegundos
      position: 'bottom', // Posición del toast en la pantalla
    });
    await toast.present();
  }
}
