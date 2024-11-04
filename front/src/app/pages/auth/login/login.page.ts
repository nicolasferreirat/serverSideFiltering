import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiRestService } from '../../../services/api-rest.service';
import { Router, RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';
import { TasksService } from '../../../services/tasks.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, NgIf, RouterLink],
  templateUrl: './login.page.html',
  styleUrl: './login.page.css',
})
export class LoginPage {
  private apiService: ApiRestService = inject(ApiRestService);
  private router: Router = inject(Router);

  username: string = '';
  password: string = '';
  errorMessage: string = '';

  async login() {
    try {
      const response = await this.apiService.post(
        'auth/',
        JSON.stringify({ username: this.username, contraseña: this.password }),
      );
      console.log(response.token);
      this.apiService.setToken(response.token);
      this.router.navigate(['/home']);
    } catch (error: unknown) {
      if (error instanceof Error) {
        if (error.message.includes('401') || error.message.includes('404')) {
          this.errorMessage = 'Las credenciales son incorrectas.';
        } else {
          this.errorMessage =
            'Hubo un problema con la autenticación. Por favor, intenta de nuevo.';
        }
      } else {
        this.errorMessage =
          'Hubo un problema inesperado. Por favor, intenta de nuevo.';
      }
    }
  }
}
