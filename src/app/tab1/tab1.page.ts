import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CrearPublicacionModalComponent } from '../crear-publicacion-modal/crear-publicacion-modal.component'; // Asegúrate de que esta ruta sea correcta

interface Publicacion {
  titulo: string;
  descripcion: string;
  imagen: string;
  ubicacion: string;
  animal: string;
  raza: string;
  edad: number | null;
  fecha: Date; // Agrega esta propiedad
}

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  publicaciones: Publicacion[] = []; // Todas las publicaciones
  publicacionesFiltradas: Publicacion[] = []; // Publicaciones que se muestran
  modalAbierto: boolean = false;

  nuevaPublicacion: any = {
    titulo: '',
    descripcion: '',
    ubicacion: '',
    animal: '',
    raza: '',
    edad: null,
    imagen: ''
  };

  constructor(private modalCtrl: ModalController) {}

  // Método para abrir el modal
  async abrirModal() {
    const modal = await this.modalCtrl.create({
      component: CrearPublicacionModalComponent,
    });
  
    modal.onDidDismiss().then((data) => {
      if (data.data) {
        // Aquí es donde deberías recibir los datos de la nueva publicación
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
      animal: this.nuevaPublicacion.animal,
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
}