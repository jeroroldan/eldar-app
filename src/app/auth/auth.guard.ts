import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AuthStatus, GlobalStore } from '../shared/global.store';

export const AuthGuard: CanActivateFn = (): Observable<boolean> => {
  const globalStore = inject(GlobalStore);
  const router = inject(Router);

  return globalStore.authStatus$.pipe(
    tap((authStatus) => {
      // Loguea el estado de autenticación
      console.log('Auth status:', authStatus);

      // Si no está autenticado, redirigir
      if (authStatus !== AuthStatus.authenticated) {
        console.log('User not authenticated. Redirecting to /auth/login.');
        router.navigate(['/auth/login']);
      }
    }),
    map((authStatus) => authStatus === AuthStatus.authenticated) // Devuelve true o false
  );
};
