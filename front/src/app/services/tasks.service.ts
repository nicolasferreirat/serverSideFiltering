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

  async getAllTasks() {
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
