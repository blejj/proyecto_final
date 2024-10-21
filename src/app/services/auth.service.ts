import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, User } from '@angular/fire/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUser: User | null = null;

  constructor(private auth: Auth) {
    // Escuchar el estado de autenticación del usuario
    onAuthStateChanged(this.auth, (user) => {
      this.currentUser = user;
    });
  }

  // Método para registrar un nuevo usuario
  register(email: string, password: string) {
    return createUserWithEmailAndPassword(this.auth, email, password);
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

  // También puedes agregar un observable para el estado de autenticación si prefieres usar programación reactiva
  getAuthState(): Observable<User | null> {
    return new Observable((subscriber) => {
      onAuthStateChanged(this.auth, (user) => {
        subscriber.next(user);
      });
    });
  }
}
