import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, User, fetchSignInMethodsForEmail, sendPasswordResetEmail } from '@angular/fire/auth';
import { Firestore, setDoc, doc, getDoc } from '@angular/fire/firestore'; // Importar Firestore
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUser: User | null = null;

  /**
 * Constructor del componente que inicializa los servicios de autenticación y Firestore.
 * Configura un observador para detectar cambios en el estado de autenticación del usuario.
 * 
 * @param {Auth} auth - Servicio de autenticación para manejar el estado del usuario.
 * @param {Firestore} firestore - Servicio de Firestore para manejar las operaciones de la base de datos.
 */
  constructor(private auth: Auth, private firestore: Firestore) { 
    /**
   * Observador del estado de autenticación.
   * Se activa cuando hay un cambio en el estado del usuario (login, logout) 
   * y actualiza la propiedad `currentUser` con el usuario autenticado actual, o `null` si no hay ninguno.
   */
    onAuthStateChanged(this.auth, (user) => {
      this.currentUser = user;
    });
  }

  /**
 * Registra un nuevo usuario en la aplicación con correo y contraseña, y guarda sus datos adicionales en Firestore.
 * 
 * @async
 * @function
 * @param {string} email - Correo electrónico del usuario para autenticarse.
 * @param {string} password - Contraseña del usuario.
 * @param {string} nombre - Nombre del usuario.
 * @param {string} apellido - Apellido del usuario.
 * @param {string} telefono - Teléfono de contacto del usuario.
 * @returns {Promise<void>} - Una promesa que se resuelve cuando el usuario está registrado y los datos se han guardado en Firestore.
 */
  async register(email: string, password: string, nombre: string, apellido: string, telefono: string) {
    // Crea el usuario con correo y contraseña en Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
    const user = userCredential.user;

    // Guarda los datos adicionales del usuario en Firestore en la colección 'users'
    await setDoc(doc(this.firestore, 'users', user.uid), {
      email: email,
      nombre: nombre,
      apellido: apellido,
      telefono: telefono,
    });
  }

  /**
 * Inicia sesión en la aplicación usando correo electrónico y contraseña.
 * 
 * @function
 * @param {string} email - Correo electrónico del usuario.
 * @param {string} password - Contraseña del usuario.
 * @returns {Promise<firebase.auth.UserCredential>} - Promesa que se resuelve con las credenciales del usuario autenticado.
 */
  login(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  /**
 * Cierra la sesión del usuario actual en la aplicación.
 * 
 * @function
 * @returns {Promise<void>} - Promesa que se resuelve cuando la sesión se ha cerrado correctamente.
 */
  logout() {
    return signOut(this.auth);
  }

  /**
 * Verifica si hay un usuario autenticado en la aplicación.
 * 
 * @function
 * @returns {boolean} - `true` si el usuario está autenticado, `false` si no lo está.
 */
  isLoggedIn(): boolean {
    return this.currentUser !== null;
  }

  /**
 * Obtiene los datos del usuario desde Firestore según su UID.
 * 
 * @async
 * @function
 * @param {string} uid - Identificador único del usuario en Firestore.
 * @returns {Promise<Object>} - Promesa que se resuelve con los datos del usuario si existen.
 * @throws {Error} - Lanza un error si el usuario no existe en Firestore.
 */
  async getUserData(uid: string) {
    const userDoc = doc(this.firestore, `users/${uid}`); // Cambia 'users' al nombre de la colección
    const docSnapshot = await getDoc(userDoc);
    
    if (docSnapshot.exists()) {
      return docSnapshot.data(); // Devuelve los datos del usuario
    } else {
      throw new Error('No existe el usuario en Firestore');
    }
  }

  /**
 * Observa el estado de autenticación del usuario y emite cambios a través de un observable.
 * 
 * @function
 * @returns {Observable<User | null>} - Observable que emite el usuario autenticado actual o `null` si no hay sesión activa.
 */
  getAuthState(): Observable<User | null> {
    return new Observable((subscriber) => {
      onAuthStateChanged(this.auth, (user) => {
        subscriber.next(user);
      });
    });
  }

  /**
 * Actualiza la foto de perfil del usuario en Firestore.
 * 
 * @async
 * @function
 * @param {string} uid - Identificador único del usuario en Firestore.
 * @param {string} photoURL - URL de la nueva foto de perfil del usuario.
 * @returns {Promise<void>} - Promesa que se resuelve cuando la foto de perfil se ha actualizado correctamente.
 */
  async updateUserProfilePicture(uid: string, photoURL: string) {
    await setDoc(doc(this.firestore, 'users', uid), { foto: photoURL }, { merge: true });
  }

  // Método para recuperar la contraseña
  async enviarCorreoRecuperacion(email: string): Promise<string> {
    try {
      await sendPasswordResetEmail(this.auth, email);
      return 'Correo de recuperación enviado con éxito.';
    } catch (error) {
      console.error('Error al enviar el correo de recuperación:', error);
      return 'Error: el correo no es válido o no está registrado.';
    }
  }

  // Método para verificar si el email está registrado
  async verificarEmailRegistrado(email: string): Promise<boolean> {
    try {
      const signInMethods = await fetchSignInMethodsForEmail(this.auth, email);
      return signInMethods.length > 0; // Retorna true si el correo está registrado
    } catch (error) {
      console.error('Error al verificar el email:', error);
      return false; // Retorna false en caso de error
    }
  }
}
