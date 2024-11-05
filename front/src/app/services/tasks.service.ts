import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  constructor() {}

  readonly baseUrl = 'http://localhost/back/';

  token?: string;

  setToken(token: string) {
    this.token = token;
  }

  isValidUser(): boolean {
    return !!this.token;
  }

  private getHeaders(): HeadersInit {
    return {
      Authorization: this.token ? `Bearer ${this.token}` : '',
      'Content-Type': 'application/json',
    };
  }

  //metodo viejo para agarrar todas las tareas, hay que ver como lo usamos
  async getAllTaskss() {
    try {
      const response = await fetch(`${this.baseUrl}/tareas`, {
        headers: this.getHeaders(),
      });
      if (!response.ok) {
        throw new Error('Failed to fetch tasks');
      }
      const tasks = await response.json();
      return tasks;
    } catch (error) {
      console.error('Error fetching tasks:', error);
      throw error;
    }
  }

  async getAllTasks(page: number = 1, pageSize: number = 5) {
    try {
      const response = await fetch(
        `${this.baseUrl}/tareas?page=${page}&page_size=${pageSize}`,
        {
          headers: this.getHeaders(),
        },
      );
      if (!response.ok) {
        throw new Error('Failed to fetch tasks');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching tasks:', error);
      throw error;
    }
  }

  async filterTasks(
    nombre?: string,
    duracion?: string,
    page: number = 1,
    pageSize: number = 5,
  ) {
    try {
      const url = new URL(`${this.baseUrl}/tareas`);
      if (nombre) url.searchParams.append('nombre', nombre);
      if (duracion) url.searchParams.append('duracion', duracion);
      url.searchParams.append('page', String(page));
      url.searchParams.append('page_size', String(pageSize));

      const response = await fetch(url.toString(), {
        headers: this.getHeaders(),
      });

      if (!response.ok) {
        throw new Error('No se pudo obtener las tareas filtradas');
      }

      const tasks = await response.json();
      return tasks;
    } catch (error) {
      console.error('Error al obtener las tareas filtradas:', error);
      throw error;
    }
  }

  async post<T = any>(id_usuario: string, body: string): Promise<T> {
    try {
      const response = await fetch(
        `${this.baseUrl}/usuarios/${id_usuario}/tareas`,
        {
          method: 'POST',
          headers: this.getHeaders(),
          body: body,
        },
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Error al crear la tarea');
      }
      return data;
    } catch (error) {
      console.error('Error en la solicitud POST:', error);
      throw error;
    }
  }
}
