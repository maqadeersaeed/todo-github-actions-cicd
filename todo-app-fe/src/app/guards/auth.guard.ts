import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthApiService } from '../services/auth-api.service';
// import { AuthService } from '../services/auth.service';


export function authGuard() {
  // const auth = inject(AuthService);
  const auth = inject(AuthApiService);
  const router = inject(Router);

  if (!auth.isLoggedIn()) {
    router.navigate(['/login']);
    return false;
  }
  return true;
}
