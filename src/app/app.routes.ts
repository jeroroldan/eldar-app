import { Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { NoAuthGuard } from './auth/no-auth.guard';

export const routes: Routes = [
  {
    path: 'auth',
    title: 'Auth',
    loadChildren: () => import('./auth/auth.routes').then((m) => m.authRoutes),
    canActivate: [NoAuthGuard],
  },
  {
    path: 'pages',
    title: 'Pages',
    loadChildren: () =>
      import('./pages/pages.routes').then((m) => m.pageRoutes),
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    redirectTo: 'pages',
  },
];
