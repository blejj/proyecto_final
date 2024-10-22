import { Injectable } from '@angular/core'; 
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, User } from '@angular/fire/auth';
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
  async register(email: string, password: string, nombre: string, apellido: string, telefono: string, foto: string) {
    // Crear un nuevo usuario
    const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
    const user = userCredential.user;

    // Guardar datos adicionales en Firestore
    await setDoc(doc(this.firestore, 'users', user.uid), {
      email: email,
      nombre: nombre,
      apellido: apellido,
      telefono: telefono,
      foto: foto
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

  async updateUserProfilePicture(uid: string, photoURL: string) {
    await setDoc(doc(this.firestore, 'users', uid), { foto: photoURL }, { merge: true });
  }
}
