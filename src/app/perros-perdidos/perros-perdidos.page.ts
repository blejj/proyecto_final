import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { CrearPublicacionModalComponent } from '../crear-publicacion-modal/crear-publicacion-modal.component';
import { CamaraService } from '../services/camara.service';
import { AuthService } from '../services/auth.service';

interface Publicacion {
  titulo: string;
  descripcion: string;
  imagen: string;
  ubicacion: string;
  raza: string;
  edad: number | null;
  fecha: Date;
}

/**
 * Componente de la página "Perros Perdidos".
 * Permite a los usuarios crear, visualizar y filtrar publicaciones sobre perros perdidos.
 * 
 * @component
 */
@Component({
  selector: 'app-perros-perdidos',
  templateUrl: 'perros-perdidos.page.html',
  styleUrls: ['perros-perdidos.page.scss']
})

export class PerrosPerdidosPage {

  //Lista de todas las publicaciones.
  publicaciones: Publicacion[] = [];

  //Publicaciones que se muestran actualmente
  publicacionesFiltradas: Publicacion[] = [];

  //Indica si el modal está abierto.
  modalAbierto: boolean = false;

  /** Objeto para almacenar los datos de la nueva publicación. */
  nuevaPublicacion: any = {
    titulo: '',
    descripcion: '',
    ubicacion: '',
    raza: '',
    edad: null,
    imagen: ''
  };

  /**
   * Crea una instancia del componente PerrosPerdidosPage.
   * 
   * @param {ModalController} modalCtrl - Controlador de modal para gestionar los modales en la aplicación.
   * @param {Router} router - Router de Angular para la navegación entre páginas.
   * @param {CamaraService} camaraService - Servicio para manejar la funcionalidad de la cámara.
   * @param {AuthService} authService - Servicio de autenticación para verificar el estado del usuario.
   */
  constructor(private modalCtrl: ModalController, private router: Router, private camaraService: CamaraService, private authService: AuthService) {}

  /**
   * Abre el modal para crear una nueva publicación.
   * 
   * @async
   * @function
   * @returns {Promise<void>} - Promesa que se resuelve cuando el modal se presenta.
   */
  async abrirModal() {
    const modal = await this.modalCtrl.create({
      component: CrearPublicacionModalComponent,
    });
  
    modal.onDidDismiss().then((data) => {
      if (data.data) {
        // Acá es donde recibimos los datos de la nueva publicación
        const nuevaPublicacion: Publicacion = {
          ...data.data,
          fecha: new Date(), // Asignar fecha al recibir la publicación
        };
        this.publicaciones.push(nuevaPublicacion); // Agrega la nueva publicación
        this.publicacionesFiltradas = [...this.publicaciones]; // Actualiza las publicaciones filtradas
      }
    });
  
    await modal.present();
  }

  /**
   * Método para cerrar el modal
   * 
   * @function
   */
  cerrarModal() {
    this.modalAbierto = false;
  }

  /**
   * Crea una nueva publicación con los datos ingresados.
   * 
   * @function
   */
  crearPublicacion() {
    const nuevaPublicacion: Publicacion = {
      titulo: this.nuevaPublicacion.titulo,
      descripcion: this.nuevaPublicacion.descripcion,
      imagen: this.nuevaPublicacion.imagen,
      ubicacion: this.nuevaPublicacion.ubicacion,
      raza: this.nuevaPublicacion.raza,
      edad: this.nuevaPublicacion.edad,
      fecha: new Date() // Asigna la fecha actual
    };

    this.publicaciones.push(nuevaPublicacion); // Agrega la nueva publicación
    this.publicacionesFiltradas = [...this.publicaciones]; // Actualiza las publicaciones filtradas
    this.cerrarModal(); // Cierra el modal después de crear la publicación
  }

  /**
   * Toma una foto utilizando el servicio de cámara y asigna la imagen a la nueva publicación.
   * 
   * @async
   * @function
   */
    async tomarFoto(){
      this.nuevaPublicacion.imagen = await this.camaraService.tomarFoto();
    }

  /**
   * Filtra las publicaciones por fecha, mostrando solo aquellas que son más recientes que el número de días especificado.
   * 
   * @param {number} dias - Número de días para filtrar las publicaciones.
   */
  filtrarPorFecha(dias: number) {
    const fechaLimite = new Date();
    fechaLimite.setDate(fechaLimite.getDate() - dias); // Establece la fecha límite

    this.publicacionesFiltradas = this.publicaciones.filter(publicacion => {
      return new Date(publicacion.fecha) >= fechaLimite; // Filtra por fecha
    });
  }

  /**
   * Navega de vuelta a la página de inicio (tabs).
   * 
   * @function
   */
  navegarInicio() {
    this.router.navigate(['/tabs']); 
  }

  /**
   * Verifica si el usuario está autenticado al ingresar a la página.
   * Si no está autenticado, redirige al usuario a la página de login.
   */
  ionViewWillEnter() {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
    }
  }
}