import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl = 'https://dog.ceo/api/';

  constructor(private http: HttpClient) { }

  //Obtener el listado de razas
  obtenerListaRaza(): Observable<any> {
    return this.http.get(`${this.baseUrl}breeds/list/all`);
  }

  // Método para obtener imágenes aleatorias
  obtenerImagenRandom(): Observable<any> {
    return this.http.get(`${this.baseUrl}breeds/image/random`);
  }

  // Método para obtener imágenes por raza
  obtenerImagenPorRaza(raza: string): Observable<any> {
    return this.http.get(`${this.baseUrl}breed/${raza}/images/random`);
  }

  // Método para obtener subrazas
  obtenerSubRazas(raza: string): Observable<any> {
    return this.http.get(`${this.baseUrl}breed/${raza}/list`);
  }


}
