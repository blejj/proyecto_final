import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ToastService } from '../services/toast.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

/**
 * Componente de la pestaña 2.
 * Permite a los usuarios seleccionar una raza de perro y cargar una imagen aleatoria de la misma.
 * 
 * @component
 */
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  /**
   * Almacena las razas de perros disponibles.
   * @type {string[]}
   */
  razas: string[] = [];

  /**
   * Raza seleccionada por el usuario.
   * @type {string}
   */
  razaSeleccionada: string = '';

  /**
   * Imagen seleccionada de la raza de perro.
   * @type {string | null}
   */
  imagenSeleccionada: string | null = null;

  /**
   * Crea una instancia del componente Tab2Page.
   * 
   * @param {ApiService} apiService - Servicio para interactuar con la API y obtener datos de razas e imágenes.
   * @param {ToastService} toastService - Servicio para mostrar mensajes de toast al usuario.
   * @param {AuthService} authService - Servicio de autenticación para verificar el estado de sesión del usuario.
   * @param {Router} router - Router de Angular para la navegación entre páginas.
   */
  constructor(private apiService: ApiService, private toastService: ToastService, private authService: AuthService, private router: Router) {}

  /**
   * Método del ciclo de vida que se ejecuta al inicializar el componente.
   * Carga la lista de razas al cargar la página.
   * 
   * @function
   * @returns {void}
   */
  ngOnInit() {
    this.cargarListaRazas();
  }

  /**
   * Carga la lista de razas desde la API y almacena los datos en la variable 'razas'.
   * Muestra un mensaje de error si no se puede cargar la lista.
   * 
   * @function
   * @returns {void}
   */
  cargarListaRazas() {
    this.apiService.obtenerListaRaza().subscribe((data: any) => {
      this.razas = Object.keys(data.message); // Obtener las razas del objeto 'message'
    },
    (error) => {
      this.toastService.showToast('Error al cargar la lista de razas:');
  });
  }

  /**
   * Carga una imagen aleatoria de la raza seleccionada.
   * 
   * @function
   * @returns {void}
   */
  cargarImagenPorRaza() {
    if (this.razaSeleccionada) {
      this.apiService.obtenerImagenPorRaza(this.razaSeleccionada).subscribe((data: any) => {
        this.imagenSeleccionada = data.message; // Almacenar la imagen seleccionada
      });
    }
  }

  /**
   * Verifica si el usuario está autenticado cada vez que la vista se va a mostrar.
   * Si el usuario no está autenticado, redirige a la página de login.
   * 
   * @function
   * @returns {void}
   */
  ionViewWillEnter() {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
    }
  }
}
