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
      const response = await this.taskService.getAllTasks(
        this.currentPage,
        this.pageSize,
      );
      this.taskList = response.tasks || [];
      console.log(this.taskList);
      this.totalPages = response.totalTasks
        ? Math.ceil(response.totalTasks / this.pageSize)
        : 0;
      console.log('Lista de todas las tareas:', this.taskList);
      console.log('Total de tareas:', response.totalTasks);
    } catch (error) {
      console.error('Error al cargar las tareas:', error);
    }
  }

  onFilter(form: NgForm) {
    const { nombre, duracion } = form.value;
    this.filteredTasks = this.taskList.filter((task) => {
      const matchesName = nombre ? task.nombre.includes(nombre) : true;
      const matchesDuration = duracion ? task.duracion == duracion : true;
      return matchesName && matchesDuration;
    });

    this.filtroAplicado = true;
    this.currentPage = 1;
    this.updateTotalPages();
  }

  updateTotalPages() {
    const totalTasks = this.filteredTasks.length;
    this.totalPages = Math.ceil(totalTasks / this.pageSize);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }
}
