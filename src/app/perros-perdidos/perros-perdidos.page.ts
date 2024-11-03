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

  // Lista de todas las publicaciones.
  publicaciones: Publicacion[] = [];

  // Publicaciones que se muestran actualmente
  publicacionesFiltradas: Publicacion[] = [];

  // Indica si el modal está abierto.
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

  constructor(private modalCtrl: ModalController, private router: Router, private camaraService: CamaraService, private authService: AuthService) {
    this.cargarPublicaciones(); // Cargar publicaciones al iniciar el componente
  }

  async abrirModal() {
    const modal = await this.modalCtrl.create({
      component: CrearPublicacionModalComponent,
    });

    modal.onDidDismiss().then((data) => {
      if (data.data) {
        const nuevaPublicacion: Publicacion = {
          ...data.data,
          fecha: new Date(), // Asignar fecha al recibir la publicación
        };
        this.publicaciones.push(nuevaPublicacion); // Agrega la nueva publicación
        this.publicacionesFiltradas = [...this.publicaciones]; // Actualiza las publicaciones filtradas
        this.guardarPublicaciones(); // Guarda las publicaciones en localStorage
      }
    });

    await modal.present();
  }

  cerrarModal() {
    this.modalAbierto = false;
  }

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
    this.guardarPublicaciones(); // Guarda las publicaciones en localStorage
    this.cerrarModal(); // Cierra el modal después de crear la publicación
  }

  async tomarFoto() {
    this.nuevaPublicacion.imagen = await this.camaraService.tomarFoto();
  }

  filtrarPorFecha(dias: number) {
    const fechaLimite = new Date();
    fechaLimite.setDate(fechaLimite.getDate() - dias); // Establece la fecha límite

    this.publicacionesFiltradas = this.publicaciones.filter(publicacion => {
      return new Date(publicacion.fecha) >= fechaLimite; // Filtra por fecha
    });
  }

  navegarInicio() {
    this.router.navigate(['/tabs']);
  }

  ionViewWillEnter() {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
    }
  }

  // Método para guardar las publicaciones en localStorage
  guardarPublicaciones() {
    localStorage.setItem('publicaciones', JSON.stringify(this.publicaciones));
  }

  // Método para cargar las publicaciones desde localStorage
  cargarPublicaciones() {
    const publicacionesGuardadas = localStorage.getItem('publicaciones');
    if (publicacionesGuardadas) {
      this.publicaciones = JSON.parse(publicacionesGuardadas);
      this.publicacionesFiltradas = [...this.publicaciones]; // Actualiza las publicaciones filtradas
    }
  }
}
