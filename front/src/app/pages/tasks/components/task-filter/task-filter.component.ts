import { Component, inject, OnInit } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Task } from '../../../../componentes/interfaces/task';
import { HttpClient } from '@angular/common/http';
import { FormsModule, NgForm } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-task-filter',
  standalone: true,
  imports: [NgFor, NgIf, FormsModule],
  templateUrl: './task-filter.component.html',
  styleUrls: ['./task-filter.component.css'],
})
export class TaskFilterComponent implements OnInit {
  httpClient: HttpClient = inject(HttpClient);
  taskList: Task[] = [];
  filteredTasks: Task[] = [];
  nombre: string = '';
  duracion: string = '';

  async ngOnInit() {
    try {
      this.taskList = await firstValueFrom(
        this.httpClient.get<Task[]>('/back/tareas'),
      );
      console.log(this.taskList);
    } catch (error) {
      console.error('Error al cargar las tareas:', error);
    }
  }

  async onFilter(form: NgForm) {
    if (form.valid) {
      try {
        const response = await firstValueFrom(
          this.httpClient.get<Task[]>('/back/tareas', {
            params: {
              nombre: this.nombre,
              duracion: this.duracion,
            },
          }),
        );
        this.filteredTasks = response;
        console.log('Tareas filtradas:', this.filteredTasks);
      } catch (error) {
        console.error('Error al filtrar las tareas:', error);
      }
    }
  }
}
