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

  constructor() {}

  ngOnInit(): void {}

  async loadTareas() {
    //implementar paginacion utilizando el servicio tasksService y guardando las tareas en la lista 'tareas'
  }

  /* funciones ya implementadas y utilizadas en el html
  get totalPages(): number {
    return Math.ceil(this.totalTareas / this.limit);
  }

  volver() {
    this.router.navigate(['/tasks']);
  }*/
}
