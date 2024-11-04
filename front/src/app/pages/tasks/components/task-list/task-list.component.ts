import { Component, inject, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Task } from '../../../../componentes/interfaces/task';
import { firstValueFrom } from 'rxjs';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [NgIf, NgFor, RouterLink],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
})
export class TaskListComponent implements OnInit {
  httpClient: HttpClient = inject(HttpClient);
  taskList: Task[] = [];

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
}
