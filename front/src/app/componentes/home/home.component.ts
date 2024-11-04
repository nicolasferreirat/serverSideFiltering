import { Component, inject, OnInit } from '@angular/core';
import { SearchComponent } from '../search/search.component';
import { TaskComponent } from '../task/task.component';
import { TasksService } from '../../services/tasks.service';
import { Task } from '../interfaces/task';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SearchComponent, TaskComponent, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  private taskService: TasksService = inject(TasksService);
  taskList: Task[] = [];

  selectedTask: Task | undefined;

  async ngOnInit() {
    this.selectedTask = this.taskList[1];
    console.log(this.taskService.getAllTasks());
    this.taskList = await this.taskService.getAllTasks();
    console.log(this.taskList);
  }

  OnSearchValue(value: string) {
    this.selectedTask = this.taskList?.find((task) => task.nombre == value);
  }
}
