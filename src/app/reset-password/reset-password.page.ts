import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage {
  email: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  async enviarCorreoRecuperacion() {
    if (!this.email) {
        alert('Por favor, ingresa un correo electrónico.');
        return; // Salir del método si el correo está vacío
    }

    // Verificar si el correo electrónico está registrado
    const isRegistered = await this.authService.verificarEmailRegistrado(this.email);
    if (!isRegistered) {
        alert('El correo electrónico no está registrado.'); // Mensaje si el correo no está registrado
        return; // Salir del método si el correo no está registrado
    }

    const mensaje = await this.authService.enviarCorreoRecuperacion(this.email);
    alert(mensaje); // Muestra el mensaje devuelto por el servicio
   this.router.navigate(['/login']); //Redirige al inicio de sesión
}
}
