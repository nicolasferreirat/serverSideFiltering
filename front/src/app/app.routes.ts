import { Routes } from '@angular/router';
import { HomeComponent } from './componentes/home/home.component';
import { TasksPage } from './pages/tasks/tasks.page';
import { LoginPage } from './pages/auth/login/login.page';
import { logueadoGuard } from './guards/logueado.guard';
import { RegistroUsuarioPage } from './pages/registro-usuario/registro-usuario.page';
import { TaskIdPage } from './pages/tasks/components/task-id/task-id.page';
import { TaskFormComponent } from './pages/tasks/components/task-form/task-form.component';
import { TaskListComponent } from './pages/tasks/components/task-list/task-list.component';
import { TaskFilterComponent } from './pages/tasks/components/task-filter/task-filter.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [logueadoGuard],
  },
  {
    path: 'auth/login',
    component: LoginPage,
  },
  {
    path: 'tasks',
    component: TasksPage,
    canActivate: [logueadoGuard],
  },
  {
    path: 'tasksList',
    component: TaskListComponent,
    canActivate: [logueadoGuard],
  },

  {
    path: 'registro',
    component: RegistroUsuarioPage,
  },
  {
    path: 'tasks/crear',
    component: TaskFormComponent,
    canActivate: [logueadoGuard],
  },
  {
    path: 'tasks/:id_tarea',
    component: TaskIdPage,
    canActivate: [logueadoGuard],
  },
  {
    path: 'tasksFilter',
    component: TaskFilterComponent,
    canActivate: [logueadoGuard],
  },
];
