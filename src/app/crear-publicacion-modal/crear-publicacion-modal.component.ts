import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-crear-publicacion-modal',
  templateUrl: './crear-publicacion-modal.component.html',
  styleUrls: ['./crear-publicacion-modal.component.scss'],
})
export class CrearPublicacionModalComponent implements OnInit {
  publicacionForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private modalController: ModalController) {
    this.publicacionForm = this.formBuilder.group({
      titulo: ['', Validators.required],
      descripcion: ['', Validators.required],
      ubicacion: ['', Validators.required],
      animal: ['', Validators.required],
      raza: ['', Validators.required],
      edad: ['', Validators.required],
      imagen: [null], // Asegúrate de que la imagen sea obligatoria
    });
  }

  ngOnInit() {}

  subirImagen(event: Event): void {
    const input = event.target as HTMLInputElement; // Asegúrate de que sea un HTMLInputElement
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      // Verifica si el archivo es una imagen
      if (file.type.startsWith('image/')) {
        this.publicacionForm.patchValue({
          imagen: file // Almacena el archivo en el formulario
        });
        console.log('Imagen seleccionada:', file.name); // Muestra el nombre de la imagen en consola
      } else {
        console.error('El archivo seleccionado no es una imagen');
      }
    } else {
      console.error('No se ha seleccionado ningún archivo');
    }
  }

  guardarPublicacion(): void {
    if (this.publicacionForm.valid) {
      const formData = new FormData(); // Crea un objeto FormData para enviar datos
      formData.append('titulo', this.publicacionForm.value.titulo);
      formData.append('descripcion', this.publicacionForm.value.descripcion);
      formData.append('ubicacion', this.publicacionForm.value.ubicacion);
      formData.append('animal', this.publicacionForm.value.animal);
      formData.append('raza', this.publicacionForm.value.raza);
      formData.append('edad', this.publicacionForm.value.edad);
      formData.append('imagen', this.publicacionForm.value.imagen); // Adjunta la imagen
  
      console.log('Publicación creada:', formData); // Muestra los datos en la consola
      this.modalController.dismiss(this.publicacionForm.value); // Devuelve la publicación al modal
    } else {
      console.error('Formulario inválido', this.publicacionForm.errors);
    }
  }

  cerrarModal(): void {
    this.modalController.dismiss();
  }
}
