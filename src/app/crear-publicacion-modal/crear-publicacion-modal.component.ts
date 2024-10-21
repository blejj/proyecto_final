import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { CamaraService } from '../services/camara.service';

@Component({
  selector: 'app-crear-publicacion-modal',
  templateUrl: './crear-publicacion-modal.component.html',
  styleUrls: ['./crear-publicacion-modal.component.scss'],
})
export class CrearPublicacionModalComponent implements OnInit {
  publicacionForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private modalController: ModalController, private camaraService: CamaraService) {
    this.publicacionForm = this.formBuilder.group({
      titulo: ['', Validators.required],
      descripcion: ['', Validators.required],
      ubicacion: ['', Validators.required],  // con el validator, estamos haciendo que sea obligatorio la carga de los datos.
      raza: ['', Validators.required],
      edad: ['', Validators.required],
      imagen: [null], 
    });
  }

  ngOnInit() {}

    //implementamos el servicio de la camara
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

  cerrarModal(): void {
    this.modalController.dismiss();
  }
}
