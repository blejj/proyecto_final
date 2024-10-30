import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, User, fetchSignInMethodsForEmail, sendPasswordResetEmail } from '@angular/fire/auth';
import { Firestore, setDoc, doc, getDoc } from '@angular/fire/firestore'; // Importar Firestore
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUser: User | null = null;

  constructor(private auth: Auth, private firestore: Firestore) { // Inyectar Firestore
    // Escuchar el estado de autenticación del usuario
    onAuthStateChanged(this.auth, (user) => {
      this.currentUser = user;
    });
  }

  // Método para registrar un nuevo usuario
  async register(email: string, password: string, nombre: string, apellido: string, telefono: string) {
    // Crear un nuevo usuario
    const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
    const user = userCredential.user;

    // Guardar datos adicionales en Firestore
    await setDoc(doc(this.firestore, 'users', user.uid), {
      email: email,
      nombre: nombre,
      apellido: apellido,
      telefono: telefono,
    });
  }

  // Método para iniciar sesión
  login(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  // Método para cerrar sesión
  logout() {
    return signOut(this.auth);
  }

  // Método para verificar si el usuario está autenticado
  isLoggedIn(): boolean {
    return this.currentUser !== null;
  }

  // Método para obtener los datos del usuario desde Firestore
  async getUserData(uid: string) {
    const userDoc = doc(this.firestore, `users/${uid}`); // Cambia 'users' al nombre de tu colección
    const docSnapshot = await getDoc(userDoc);
    
    if (docSnapshot.exists()) {
      return docSnapshot.data(); // Devuelve los datos del usuario
    } else {
      throw new Error('No existe el usuario en Firestore');
    }
  }

  getAuthState(): Observable<User | null> {
    return new Observable((subscriber) => {
      onAuthStateChanged(this.auth, (user) => {
        subscriber.next(user);
      });
    });
  }

  // Método para cambiar foto de perfil 
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
