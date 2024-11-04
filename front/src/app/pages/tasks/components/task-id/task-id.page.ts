import { Component, input, OnInit } from '@angular/core';

@Component({
  selector: 'app-task-id',
  standalone: true,
  imports: [],
  templateUrl: './task-id.page.html',
  styleUrl: './task-id.page.css',
})
export class TaskIdPage implements OnInit {
  id = input<string>();

  ngOnInit(): void {
    console.log(
      'El id de la tarea que imprimimos en task-id-page es:',
      this.id(),
    );
  }
}
