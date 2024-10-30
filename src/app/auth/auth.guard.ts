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

      if (authStatus !== AuthStatus.authenticated) {
        router.navigate(['/auth/login']);
      }
    }),
    map((authStatus) => authStatus === AuthStatus.authenticated)
  );
};
