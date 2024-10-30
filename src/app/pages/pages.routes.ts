import { Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';

export const pageRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./layoaut-user.component').then((m) => m.UserLayoutComponent),
    children: [
      {
        path: 'user-list',
        loadComponent: () =>
          import('./users-list/users-list.component').then(
            (m) => m.UsersListComponent
          ),
        canActivate: [AuthGuard], // Añadir el AuthGuard aquí si quieres proteger esta ruta
      },
      {
        path: 'user-detail/:id',
        loadComponent: () =>
          import('./user-detail/user-detail.component').then(
            (m) => m.UserDatailComponent // Corregido aquí
          ),
        canActivate: [AuthGuard], // Añadir el AuthGuard aquí si quieres proteger esta ruta
      },
      {
        path: '',
        redirectTo: 'user-list',
        pathMatch: 'full',
      },
      {
        path: '**',
        redirectTo: 'user-list',
      },
    ],
  },
];
