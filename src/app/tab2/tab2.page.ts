import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  razas: string[] = []; // Almacena las razas de perros
  razaSeleccionada: string = '';
  imagenSeleccionada: string | null = null; // Almacena la imagen seleccionada

  constructor(private apiService: ApiService, private toastService: ToastService) {}

  ngOnInit() {
    this.cargarListaRazas();
  }

  // Cargar la lista de razas
  cargarListaRazas() {
    this.apiService.obtenerListaRaza().subscribe((data: any) => {
      this.razas = Object.keys(data.message); // Obtener las razas del objeto 'message'
    },
    (error) => {
      this.toastService.showToast('Error al cargar la lista de razas:');
  });
  }

  // Obtener una imagen aleatoria de la raza seleccionada
  cargarImagenPorRaza() {
    if (this.razaSeleccionada) {
      this.apiService.obtenerImagenPorRaza(this.razaSeleccionada).subscribe((data: any) => {
        this.imagenSeleccionada = data.message; // Almacenar la imagen seleccionada
      });
    }
  }
}
