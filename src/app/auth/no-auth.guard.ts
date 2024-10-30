import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AuthStatus, GlobalStore } from '../shared/global.store';

export const NoAuthGuard: CanActivateFn = (): Observable<boolean> => {
  const globalStore = inject(GlobalStore);
  const router = inject(Router);

  return globalStore.authStatus$.pipe(
    tap((authStatus) => {
      console.log('Auth status:', authStatus);

      if (authStatus === AuthStatus.authenticated) {
        console.log('User is authenticated. Redirecting to /pages.');
        router.navigate(['/pages']);
      }
    }),
    map((authStatus) => authStatus !== AuthStatus.authenticated)
  );
};
