import { Component, inject, OnInit } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Task } from '../../../../componentes/interfaces/task';
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

  // Paginación
  currentPage: number = 1;
  pageSize: number = 5; 
  totalPages: number = 0;

  async ngOnInit() {
    await this.loadTasks();
  }

  async loadTasks() {
    try {
      const response = await this.taskService.getAllTasks(this.currentPage, this.pageSize);
      this.taskList = response.tasks || [];
      this.totalPages = Math.ceil(response.totalTasks / this.pageSize);
      console.log('Lista de todas las tareas:', this.taskList);
    } catch (error) {
      console.error('Error al cargar las tareas:', error);
    }
  }

  async onFilter(form: NgForm) {
    if (form.valid) {
      try {
        this.filteredTasks = await this.taskService.filterTasks(this.nombre, this.duracion);
        this.filtroAplicado = true;
        this.currentPage = 1; 
        this.totalPages = Math.ceil(this.filteredTasks.length / this.pageSize);
        console.log('Tareas filtradas:', this.filteredTasks);
      } catch (error) {
        console.error('Error al filtrar las tareas:', error);
      }
    }
  }

  //siguiente page
  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  //anterior page
  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }
}
