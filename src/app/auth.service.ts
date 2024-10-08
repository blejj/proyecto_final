import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})


export class AuthService {

  /**
   * Constructor que inyecta la instancia de Firebase Auth.
   * 
   * @param {Auth} auth - Instancia del servicio de autenticación de Firebase.
   */
  constructor(private auth: Auth) {}

  /**
   * Inicia sesión con el correo electrónico y la contraseña proporcionados.
   * 
   * @param {string} email - Correo electrónico del usuario.
   * @param {string} password - Contraseña del usuario.
   * @returns {Promise<any>} Retorna una promesa que se resuelve si el inicio de sesión es exitoso 
   * o se rechaza con un error si falla.
   */
  login(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  /**
   * Registra un nuevo usuario con el correo electrónico y la contraseña proporcionados.
   * 
   * @param {string} email - Correo electrónico del nuevo usuario.
   * @param {string} password - Contraseña del nuevo usuario.
   * @returns {Promise<any>} Retorna una promesa que se resuelve si el registro es exitoso 
   * o se rechaza con un error si falla.
   */
  register(email: string, password: string) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }
}