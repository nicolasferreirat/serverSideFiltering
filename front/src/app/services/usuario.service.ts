import { inject, Injectable } from '@angular/core';
import { ApiRestService } from './api-rest.service';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  apiService: ApiRestService = inject(ApiRestService);

  validarNombreUsuario(nombreUsuario: string): boolean {
    return true;
  }

  validarCorreo(mail: string): boolean {
    return true;
  }

  registrarUsuario(usuario: any): Promise<any> {
    return this.apiService.post('usuarios', JSON.stringify(usuario));
  }
}
