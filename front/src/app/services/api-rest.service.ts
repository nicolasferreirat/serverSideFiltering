import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiRestService {
  readonly baseUrl = 'http://localhost/back/';

  token?: string;

  setToken(token: string) {
    this.token = token;
    console.log('Token establecido:', this.token);
  }

  getUserId(): number | null {
    if (this.token) {
      try {
        const payload = this.token.split('.')[1];

        const decodedPayload = JSON.parse(
          atob(payload.replace(/-/g, '+').replace(/_/g, '/')),
        );

        console.log('Payload decodificado:', decodedPayload);
        return decodedPayload.id_usuario || null;
      } catch (error) {
        console.error('Error al decodificar el token manualmente:', error);
        return null;
      }
    }
    return null;
  }

  isValidUser(): boolean {
    return !!this.token;
  }

  private getHeaders(): HeadersInit {
    if (this.token) {
      return {
        Authorization: `Bearer ${this.token}`,
        'Content-Type': 'application/json',
      };
    } else {
      return {
        'Content-Type': 'application/json',
      };
    }
  }

  async post<T = any>(url: string, body: string): Promise<T> {
    try {
      const response = await fetch(`${this.baseUrl}${url}`, {
        //
        method: 'POST',
        headers: this.getHeaders(),
        body: body,
      });
      const data = await response.json();
      //Si la respuesta del data es okay
      if (response.ok) {
        return data;
      } else {
        //Devolvemos el error
        throw new Error(data);
      }
    } catch (error) {
      throw error;
    }
  }

  constructor() {}
}
