import { Component, inject, OnInit } from '@angular/core';
import { Task } from '../../../../componentes/interfaces/task';
import { FormsModule, NgForm } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { TasksService } from '../../../../services/tasks.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-filter',
  standalone: true,
  imports: [NgFor, NgIf, FormsModule],
  templateUrl: './task-filter.component.html',
  styleUrls: ['./task-filter.component.css'],
})
export class TaskFilterComponent implements OnInit {
  private taskService = inject(TasksService);
  router: Router = inject(Router);

  taskList: Task[] = [];
  filteredTasks: Task[] = [];
  nombre: string = '';
  duracion: string = '';
  filtroAplicado: boolean = false;

  async ngOnInit() {
    //implementar lógica para que se carguen todas las tareas
  }

  async onFilter(form: NgForm) {
    //implementar lógica para filtrar las tareas utilizando el metodo del tasksService pasandole como parámetro nombre y duracion.
  }

  volver() {
    this.router.navigate(['/tasks']);
  }
}
