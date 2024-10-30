import { Routes } from '@angular/router';
import { NoAuthGuard } from './no-auth.guard';

export const authRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./auth-layout..component').then((m) => m.AuthLayoutComponent), // Corrige el nombre del archivo
    children: [
      {
        path: 'login',
        canActivate: [NoAuthGuard],
        loadComponent: () =>
          import('./login/login.component').then((m) => m.LoginComponent),
      },
      {
        path: 'register',
        canActivate: [NoAuthGuard],
        loadComponent: () =>
          import('./register/register.component').then(
            (m) => m.RegisterComponent
          ),
      },
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
      },
    ],
  },
];
