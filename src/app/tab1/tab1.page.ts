import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CrearPublicacionModalComponent } from '../crear-publicacion-modal/crear-publicacion-modal.component';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';


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
  constructor(private router: Router, private authService: AuthService) {}

  navegarAPerrosPerdidos() {
    this.router.navigate(['/perros-perdidos']);
  }

  navegarAPerrosEncontrados() {
    this.router.navigate(['/perros-encontrados']);
  }

  ionViewWillEnter() {
    // Verificar si el usuario está autenticado
    if (!this.authService.isLoggedIn()) {
      // Redirigir al login si no está autenticado
      this.router.navigate(['/login']);
    }
  }
}