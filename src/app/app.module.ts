import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicModule } from '@ionic/angular'; 
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
// Firebase imports
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { CrearPublicacionModalComponent } from './crear-publicacion-modal/crear-publicacion-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    CrearPublicacionModalComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(), // Configuración básica de Ionic
    AppRoutingModule, // Agrega AppRoutingModule para las rutas
    FormsModule, //Crear y gestionar formularios que dependen del HTML de la plantilla.
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    // Inicializar Firebase con la configuración del entorno
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    // Inicializar Firebase Auth
    provideAuth(() => getAuth()),
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA] 
})
export class AppModule {}