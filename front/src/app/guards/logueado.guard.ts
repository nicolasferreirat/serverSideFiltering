import { CanActivateFn, Router } from '@angular/router';
import { ApiRestService } from '../services/api-rest.service';
import { inject } from '@angular/core';
import { TestRequest } from '@angular/common/http/testing';

export const logueadoGuard: CanActivateFn = (route, state) => {
  const apiService: ApiRestService = inject(ApiRestService);

  const router: Router = inject(Router);

  if (apiService.isValidUser()) {
    return true;
  }
  router.navigate(['/auth/login']);
  return false;
};
