import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CrearPublicacionModalComponent } from '../crear-publicacion-modal/crear-publicacion-modal.component';
import { Router } from '@angular/router';


interface Publicacion {
  titulo: string;
  descripcion: string;
  imagen: string;
  ubicacion: string;
  animal: string;
  raza: string;
  edad: number | null;
  fecha: Date;
}

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})

export class Tab1Page {
  constructor(private router: Router) {}

  navegarAPerrosPerdidos() {
    this.router.navigate(['/perros-perdidos']);
  }

  navegarAPerrosEncontrados() {
    this.router.navigate(['/perros-encontrados']);
  }
}