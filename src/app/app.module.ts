import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicModule } from '@ionic/angular'; 
// Firebase imports
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment'; // Configuración del entorno
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(), // Configuración básica de Ionic
    AppRoutingModule, // Agrega AppRoutingModule para las rutas
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