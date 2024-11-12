import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ToastService } from '../services/toast.service';
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

@Component({
  selector: 'app-perros-encontrados',
  templateUrl: 'perros-encontrados.page.html',
  styleUrls: ['perros-encontrados.page.scss']
})
export class PerrosEncontradosPage {
  publicaciones: Publicacion[] = [];
  publicacionesFiltradas: Publicacion[] = [];
  modalAbierto: boolean = false;

  nuevaPublicacion: any = {
    titulo: '',
    descripcion: '',
    ubicacion: '',
    raza: '',
    edad: null,
    imagen: ''
  };

  constructor(private modalCtrl: ModalController, private router: Router, private apiService: ApiService, private toastService: ToastService, private camaraService: CamaraService, private authService: AuthService) {}

  async ionViewWillEnter() {
    // Cargar publicaciones desde localStorage
    this.cargarPublicacionesDesdeLocalStorage();

    // Verificar si el usuario está autenticado
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
    }
  }

  // Método para cargar publicaciones desde localStorage
  cargarPublicacionesDesdeLocalStorage() {
    const existingPosts = localStorage.getItem('lostDogPosts');
    this.publicaciones = existingPosts ? JSON.parse(existingPosts) : [];
    this.publicacionesFiltradas = [...this.publicaciones]; // Actualiza las publicaciones filtradas
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

        // Guardar en localStorage
        this.guardarPublicacionesEnLocalStorage();
      }
    });

    await modal.present();
  }

  // Método para guardar publicaciones en localStorage
  guardarPublicacionesEnLocalStorage() {
    localStorage.setItem('lostDogPosts', JSON.stringify(this.publicaciones));
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
    this.guardarPublicacionesEnLocalStorage(); // Guardar en localStorage
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
}
