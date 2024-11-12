// src/app/tab2/tab2.page.ts
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { datosRazas } from '../services/datosRaza';

/**
 * Componente para mostrar la lista de razas de perros.
 * Permite expandir cada raza para mostrar información adicional.
 */
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page implements OnInit {
  razasPerros: any[] = []; // Lista de razas de perros
  expandedItem: string | null = null; // Almacena el nombre del elemento expandido

  /**
   * Crea una instancia de Tab2Page.
   * @param {ApiService} apiService - Servicio para obtener datos de la API.
   */
  constructor(private apiService: ApiService) {}

  /**
   * Método del ciclo de vida que se ejecuta al inicializar el componente.
   * Aquí se obtienen las imágenes de las razas de perros.
   */
  ngOnInit() {
    this.razasPerros = datosRazas;

    // Obtiene la imagen de cada raza desde la API
    this.razasPerros.forEach((perro) => {
      this.apiService.obtenerImagenPorRaza(perro.nombre.toLowerCase()).subscribe(
        (data) => {
          perro.imagen = data.message; // Asegúrate de que 'message' es la propiedad correcta
        },
        (error) => {
          console.error('Error al obtener imagen para la raza', perro.nombre, error);
        }
      );
    });
  }

  /**
   * Alterna la expansión de un elemento en la lista.
   * @param {string} nombre - Nombre de la raza que se está expandiendo.
   */
  toggleExpansion(nombre: string) {
    this.expandedItem = this.expandedItem === nombre ? null : nombre; // Cambia el estado de expansión
  }
}
