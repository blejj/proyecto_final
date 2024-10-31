import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

/**
 * Servicio para mostrar mensajes de toast en la aplicación.
 * Se optó por crear un servicio para este método, ya que es un código que se repite muchas veces en la app.
 * 
 * @class
 */
@Injectable({
  providedIn: 'root'
})
export class ToastService {

  /**
   * Crea una instancia del servicio ToastService.
   * 
   * @param {ToastController} toastController - Controlador de toast de Ionic para gestionar las notificaciones.
   */
  constructor(private toastController: ToastController) {}

  /**
   * Muestra un mensaje de toast en la parte inferior de la pantalla.
   * 
   * @async
   * @function
   * @param {string} message - Mensaje que se mostrará en el toast.
   * @returns {Promise<void>} - Promesa que se resuelve cuando el toast se presenta.
   */
  async showToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000,
      position: 'bottom',
    });
    await toast.present();
  }
}
