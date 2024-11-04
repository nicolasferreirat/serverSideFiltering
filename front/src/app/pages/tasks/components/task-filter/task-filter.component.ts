import { Component, inject, OnInit } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Task } from '../../../../componentes/interfaces/task';
import { HttpClient } from '@angular/common/http';
import { FormsModule, NgForm } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { TasksService } from '../../../../services/tasks.service';

@Component({
  selector: 'app-task-filter',
  standalone: true,
  imports: [NgFor, NgIf, FormsModule],
  templateUrl: './task-filter.component.html',
  styleUrls: ['./task-filter.component.css'],
})
export class TaskFilterComponent implements OnInit {
  private taskService = inject(TasksService);
  taskList: Task[] = [];
  filteredTasks: Task[] = [];
  nombre: string = '';
  duracion: string = '';
  filtroAplicado: boolean = false;

  async ngOnInit() {
    try {
      this.taskList = await this.taskService.getAllTasks();
      console.log('Lista de todas las tareas:', this.taskList);
    } catch (error) {
      console.error('Error al cargar las tareas:', error);
    }
  }

  async onFilter(form: NgForm) {
    if (form.valid) {
      try {
        this.filteredTasks = await this.taskService.filterTasks(
          this.nombre,
          this.duracion,
        );
        this.filtroAplicado = true;
        console.log('Tareas filtradas:', this.filteredTasks);
      } catch (error) {
        console.error('Error al filtrar las tareas:', error);
      }
    }
  }
}
