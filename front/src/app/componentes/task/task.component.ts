import { Component, input } from '@angular/core';

import { JsonPipe, NgIf } from '@angular/common';
import { Task } from '../interfaces/task';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [JsonPipe, NgIf],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css',
})
export class TaskComponent {
  task = input<Task | undefined>(undefined);
}
