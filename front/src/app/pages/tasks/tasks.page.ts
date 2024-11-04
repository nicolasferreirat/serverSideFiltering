import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [RouterLink, NgIf, NgFor],
  templateUrl: './tasks.page.html',
  styleUrls: ['./tasks.page.css'],
})
export class TasksPage {}
