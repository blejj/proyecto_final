import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { Auth } from '@angular/fire/auth';
import { getStorage, ref, uploadBytes, getDownloadURL } from '@angular/fire/storage';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {
  userData: any = {}; // Para almacenar los datos del usuario
  storage = getStorage(); // Obtener la instancia del almacenamiento

  constructor(
    private authService: AuthService,
    private router: Router,
    private auth: Auth
  ) {}

  async ngOnInit() {
    // Suscribirse al estado de autenticación del usuario
    this.auth.onAuthStateChanged(async (user) => {
      if (user) {
        try {
          // Obtener los datos del usuario desde el servicio
          this.userData = await this.authService.getUserData(user.uid);
        } catch (error) {
          console.error('Error al obtener los datos del usuario:', error);
        }
      } else {
        // Si no hay usuario autenticado, redirigir al login
        this.router.navigate(['/login']);
      }
    });
  }

  async changeProfilePicture() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';

    input.onchange = async (event: Event) => {
      const target = event.target as HTMLInputElement;
      const file = target.files?.[0]; // Usar el operador opcional

      if (file && this.auth.currentUser) { // Verificar si currentUser no es null
        const filePath = `profile_pictures/${this.auth.currentUser.uid}`;
        const fileRef = ref(this.storage, filePath); // Referencia al archivo

        try {
          // Subir el archivo
          await uploadBytes(fileRef, file);
          const downloadURL = await getDownloadURL(fileRef); // Obtener la URL de descarga
          
          // Actualizar la URL de la foto en Firestore
          await this.authService.updateUserProfilePicture(this.auth.currentUser.uid, downloadURL);
          this.userData.foto = downloadURL; // Actualizar la imagen en la interfaz de usuario
        } catch (error) {
          console.error('Error al subir la imagen:', error);
        }
      } else {
        console.error('No hay usuario autenticado o no se seleccionó un archivo');
      }
    };

    input.click();
  }

  async logout() {
    try {
      await this.authService.logout();
      this.router.navigate(['/login']);
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      alert('Ocurrió un error al cerrar sesión');
    }
  }

  ionViewWillEnter() {
    // Verificar si el usuario está autenticado
    if (!this.authService.isLoggedIn()) {
      // Redirigir al login si no está autenticado
      this.router.navigate(['/login']);
    }
  }
}
