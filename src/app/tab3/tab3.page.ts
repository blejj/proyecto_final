import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { Auth } from '@angular/fire/auth';
import { getStorage, ref, uploadBytes, getDownloadURL } from '@angular/fire/storage';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {
  userData: any = {};
  storage = getStorage();

  constructor(
    private authService: AuthService,
    private router: Router,
    private auth: Auth,
    private actionSheetController: ActionSheetController // Inyectar ActionSheetController
  ) {}

  async ngOnInit() {
    this.auth.onAuthStateChanged(async (user) => {
      if (user) {
        try {
          this.userData = await this.authService.getUserData(user.uid);
        } catch (error) {
          console.error('Error al obtener los datos del usuario:', error);
        }
      } else {
        this.router.navigate(['/login']);
      }
    });
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Cambiar foto de perfil',
      buttons: [
        {
          text: 'Tomar Foto',
          icon: 'camera',
          handler: () => this.takePhoto()
        },
        {
          text: 'Seleccionar desde Galería',
          icon: 'image',
          handler: () => this.selectFromGallery()
        },
        {
          text: 'Cancelar',
          icon: 'close',
          role: 'cancel'
        }
      ]
    });
    await actionSheet.present();
  }

  async takePhoto() {
    try {
      const photo = await Camera.getPhoto({
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Camera,
        quality: 90
      });

      if (photo.dataUrl) {
        const file = await this.dataUrlToFile(photo.dataUrl, 'profile.jpg');
        await this.uploadFile(file);
      }
    } catch (error) {
      console.error("Error al tomar la foto:", error);
    }
  }

  async selectFromGallery() {
    try {
      const photo = await Camera.getPhoto({
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Photos,
        quality: 90
      });

      if (photo.dataUrl) {
        const file = await this.dataUrlToFile(photo.dataUrl, 'profile.jpg');
        await this.uploadFile(file);
      }
    } catch (error) {
      console.error("Error al seleccionar la foto:", error);
    }
  }

  async dataUrlToFile(dataUrl: string, filename: string): Promise<File> {
    const res: Response = await fetch(dataUrl);
    const blob = await res.blob();
    return new File([blob], filename, { type: 'image/jpeg' });
  }

  async uploadFile(file: File) {
    if (file && this.auth.currentUser) {
      const filePath = `profile_pictures/${this.auth.currentUser.uid}`;
      const fileRef = ref(this.storage, filePath);

      try {
        await uploadBytes(fileRef, file);
        const downloadURL = await getDownloadURL(fileRef);
        await this.authService.updateUserProfilePicture(this.auth.currentUser.uid, downloadURL);
        this.userData.foto = downloadURL;
      } catch (error) {
        console.error("Error al subir la imagen:", error);
      }
    }
  }

  async logout() {
    try {
      await this.authService.logout();
      this.router.navigate(['/login']);
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
      alert("Ocurrió un error al cerrar sesión");
    }
  }

  ionViewWillEnter() {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
    }
  }
}
