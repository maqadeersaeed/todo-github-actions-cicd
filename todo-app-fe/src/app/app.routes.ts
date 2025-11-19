import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login.page').then(m => m.LoginPage)
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./pages/register/register.page').then(m => m.RegisterPage)
  },
  {
    path: 'tasks',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./layout/app-layout').then(m => m.AppLayoutComponent),
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./pages/tasks/tasks.page').then(m => m.TasksPage)
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];
