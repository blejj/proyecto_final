import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { CamaraService } from '../services/camara.service';

/**
 * Componente del modal para crear una nueva publicación.
 * Permite al usuario ingresar detalles sobre la publicación, incluyendo una imagen.
 * 
 * @component
 */
@Component({
  selector: 'app-crear-publicacion-modal',
  templateUrl: './crear-publicacion-modal.component.html',
  styleUrls: ['./crear-publicacion-modal.component.scss'],
})
export class CrearPublicacionModalComponent implements OnInit {

  /**
   * Formulario para la creación de publicaciones.
   * @type {FormGroup}
   */
  publicacionForm: FormGroup;

  /**
   * Crea una instancia del componente CrearPublicacionModalComponent.
   * 
   * @param {FormBuilder} formBuilder - Servicio para construir formularios reactivos.
   * @param {ModalController} modalController - Controlador de modales de Ionic.
   * @param {CamaraService} camaraService - Servicio para manejar la cámara y tomar fotos.
   */
  constructor(private formBuilder: FormBuilder, private modalController: ModalController, private camaraService: CamaraService) {
    this.publicacionForm = this.formBuilder.group({
      titulo: ['', Validators.required],
      descripcion: ['', Validators.required],
      ubicacion: ['', Validators.required],
      raza: ['', Validators.required],
      edad: ['', Validators.required],
      imagen: [null], 
    });
  }

  ngOnInit() {}

  /**
   * Carga una foto utilizando el servicio de cámara y actualiza el formulario con la imagen capturada.
   * 
   * @async
   * @function
   */
    async cargarFoto(){
      const imagenUrl = await this.camaraService.tomarFoto();

      if(imagenUrl){
        //actualizar formulario con la imagen capturada
        this.publicacionForm.patchValue({
          imagen: imagenUrl
        })
        
        //para verificar en consola imagen capturada/seleccionada
        console.log('Imagen capturada:', imagenUrl);
      }
    }

  /**
   * Guarda la publicación si el formulario es válido.
   * Crea un objeto FormData para enviar los datos de la publicación.
   * 
   * @function
   */
  guardarPublicacion(): void {
    if (this.publicacionForm.valid) {
      const formData = new FormData(); // Crea un objeto FormData para enviar datos
      formData.append('titulo', this.publicacionForm.value.titulo);
      formData.append('descripcion', this.publicacionForm.value.descripcion);
      formData.append('ubicacion', this.publicacionForm.value.ubicacion);
      formData.append('raza', this.publicacionForm.value.raza);
      formData.append('edad', this.publicacionForm.value.edad);
      formData.append('imagen', this.publicacionForm.value.imagen); // Adjunta la imagen
  
      console.log('Publicación creada:', formData); // Muestra los datos en la consola
      this.modalController.dismiss(this.publicacionForm.value); // Devuelve la publicación al modal
    } else {
      console.error('Formulario inválido', this.publicacionForm.errors);
    }
  }

  /**
   * Cierra el modal de creación de publicación.
   * 
   * @function
   */
  cerrarModal(): void {
    this.modalController.dismiss();
  }
}
