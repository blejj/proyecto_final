import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ToastService } from '../services/toast.service';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { CrearPublicacionModalComponent } from '../crear-publicacion-modal/crear-publicacion-modal.component'; // Asegúrate de que esta ruta sea correcta

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
  publicaciones: Publicacion[] = []; // Todas las publicaciones
  publicacionesFiltradas: Publicacion[] = []; // Publicaciones que se muestran
  modalAbierto: boolean = false; // Arranca el modal en false

  nuevaPublicacion: any = {
    titulo: '',
    descripcion: '',
    ubicacion: '',
    raza: '',
    edad: null,
    imagen: ''
  };

  constructor(private modalCtrl: ModalController, private router: Router, private apiService: ApiService, private toastService: ToastService) {}

  // Método para abrir el modal
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

  // Método para cerrar el modal
  cerrarModal() {
    this.modalAbierto = false;
  }

  // Método para crear una publicación
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

  // Método para subir una imagen
  subirImagen(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.nuevaPublicacion.imagen = URL.createObjectURL(file); // Para mostrar la imagen
    }
  }

  // Método para filtrar las publicaciones por fecha
  filtrarPorFecha(dias: number) {
    const fechaLimite = new Date();
    fechaLimite.setDate(fechaLimite.getDate() - dias); // Establece la fecha límite

    this.publicacionesFiltradas = this.publicaciones.filter(publicacion => {
      return new Date(publicacion.fecha) >= fechaLimite; // Filtra por fecha
    });
  }

  navegarInicio() {
    this.router.navigate(['/tabs']); // Cambia '/tabs' si tu ruta de inicio es diferente
  }
}