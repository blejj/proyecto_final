import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

/**
 * Servicio para manejar la funcionalidad de la cámara en la aplicación.
 * Proporciona métodos para tomar fotos y manipular imágenes.
 * 
 * @class
 */
@Injectable({
  providedIn: 'root'
})
export class CamaraService {

  constructor() { }

  /**
   * Toma una foto o selecciona una imagen de la galería.
   * 
   * Utiliza el método `Camera.getPhoto` del plugin Capacitor para permitir al usuario tomar una 
   * foto o elegir una desde su galería de imágenes. El usuario tiene la opción de elegir entre 
   * tomar una foto o seleccionar una imagen existente a través de un cuadro de diálogo.
   * 
   * @returns {Promise<string | undefined>} - Promesa que se resuelve con la ruta de la imagen capturada, o `undefined` si ocurre un error.
   * 
   * 
   * **Notas**:
   * - `quality`: Establece la calidad de la imagen a 90 (valor entre 0 y 100).
   * - `allowEditing`: Si se establece en `true`, permite al usuario editar la imagen después de tomarla.
   * - `resultType`: Especifica el tipo de resultado que se desea recibir. En este caso, se usa `CameraResultType.Uri`
   *   para obtener la URL de la imagen.
   * - `source`: Permite al usuario elegir entre diferentes fuentes de imágenes. Usando `CameraSource.Prompt` se
   *   le presenta un cuadro de diálogo para que el usuario decida si tomar una foto o elegir una existente.
   * 
   * **Consideraciones**:
   * - La propiedad `image.webPath` es especialmente útil en entornos web, ya que no es necesario convertir el
   *   archivo a un objeto `File`. Sin embargo, si se requiere subir la imagen a un servidor, es recomendable 
   *   usar `CameraResultType.Base64` o almacenar el archivo localmente para acceder al archivo original.
   */
  async tomarFoto(): Promise<string | undefined> {

      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Uri,
        source: CameraSource.Prompt
      });

      return image.webPath;  
  }
}
