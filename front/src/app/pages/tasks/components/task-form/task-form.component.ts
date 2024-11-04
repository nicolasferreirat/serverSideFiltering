import { Component, inject, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { TaskPost } from '../../../../componentes/interfaces/task';
import { JsonPipe, NgIf } from '@angular/common';
import { TakenDirective } from '../../../../directives/taken.directive';
import { TasksService } from '../../../../services/tasks.service';
import { Router } from '@angular/router';
import { ApiRestService } from '../../../../services/api-rest.service';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [FormsModule, JsonPipe, TakenDirective, NgIf],
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css'],
})
export class TaskFormComponent implements OnInit {
  private tasksService: TasksService = inject(TasksService);
  private apiService: ApiRestService = inject(ApiRestService);
  private router: Router = inject(Router);

  public task: TaskPost = { duracion: 0, nombre: '' };
  public id_usuario: number | null = null;

  ngOnInit() {
    this.id_usuario = this.apiService.getUserId();
    if (this.id_usuario === null) {
      console.error(
        'No se encontró un token válido. Redirigiendo a la página de inicio de sesión.',
      );
    }
  }

  public async onSubmit(
    taskform: NgForm,
  ): Promise<{ taken: boolean } | undefined> {
    console.log('TAREA:', this.task);

    if (taskform.valid) {
      try {
        if (this.id_usuario === null) {
          console.error('No se pudo obtener el ID del usuario.');
          return { taken: true };
        }

        const sent = await this.tasksService.post(
          this.id_usuario.toString(),
          JSON.stringify({
            nombre: this.task.nombre,
            duracion: this.task.duracion,
          }),
        );

        console.log('Respuesta del servidor:', sent);
        this.router.navigate(['/tasks']);
        console.info('Tarea creada con éxito', taskform);
        return undefined;
      } catch (error) {
        console.error('Error al crear la tarea:', error);
        return { taken: true };
      }
    } else {
      console.error('La tarea no es válida');
      return { taken: true };
    }
  }
}
