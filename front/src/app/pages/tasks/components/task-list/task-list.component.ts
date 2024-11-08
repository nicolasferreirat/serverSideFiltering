import { Component, inject, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { Task } from '../../../../componentes/interfaces/task';
import { Router, RouterLink } from '@angular/router';
import { TasksService } from '../../../../services/tasks.service';
@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [NgIf, NgFor, RouterLink],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
})
export class TaskListComponent implements OnInit {
  tareas: Task[] = [];
  totalTareas: number = 0;
  page: number = 1;
  limit: number = 5;

  constructor() {}
  tasksService: TasksService = inject(TasksService);
  router: Router = inject(Router);

  ngOnInit(): void {
    this.loadTareas();
  }

  async loadTareas(page = this.page, limit = this.limit) {
    try {
      const queryParams = new URLSearchParams();
      queryParams.append('page', page.toString());
      queryParams.append('limit', limit.toString());

      //implementar utilizando el getPaginatedTasks creado en tasksService.
    } catch (error) {
      console.error('Error cargando las tareas:', error);
    }
  }

  //Metodo creado para calcular el total de paginas para la cantidad de tareas.
  get totalPages(): number {
    return Math.ceil(this.totalTareas / this.limit);
  }

  volver() {
    this.router.navigate(['/tasks']);
  }
}
