import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { Router } from '@angular/router';
import { AuthService, User } from '../auth/auth.service';
import { Observable, tap, switchMap, catchError, of } from 'rxjs';

export enum AuthStatus {
  checking = 'checking',
  authenticated = 'authenticated',
  notAuthenticated = 'notAuthenticated',
}

export interface GlobalState {
  user: User | null;
  token: string | null;
  roles: string[];
  authStatus: AuthStatus;
  error: string | null;
}

const initialState: GlobalState = {
  user: null,
  token: null,
  roles: [],
  authStatus: AuthStatus.notAuthenticated,
  error: null,
};

@Injectable({ providedIn: 'root' })
export class GlobalStore extends ComponentStore<GlobalState> {
  constructor(private authService: AuthService, private router: Router) {
    super(initialState);
    this.checkAuthStatus();
  }


  readonly authStatus$ = this.select((state) => state.authStatus);
  readonly user$ = this.select((state) => state.user);


  readonly setAuthStatus = this.updater((state, authStatus: AuthStatus) => ({
    ...state,
    authStatus,
  }));

  readonly login = this.effect<{ email: string; password: string }>(
    (credentials$) =>
      credentials$.pipe(
        tap(() => this.patchState({ authStatus: AuthStatus.checking })),
        switchMap(({ email, password }) =>
          this.authService.login({ email, password }).pipe(
            tap((response) => {
              localStorage.setItem('token', response.token);
              this.setAuthStatus(AuthStatus.authenticated);
              this.router.navigate(['/pages']);
            }),
            catchError((error) => {
              this.setAuthStatus(AuthStatus.notAuthenticated);
              return of(error);
            })
          )
        )
      )
  );

  readonly checkAuthStatus = this.effect<void>(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      this.setAuthStatus(AuthStatus.notAuthenticated);
      return of(undefined); // Salir de la función
    }

    return this.authService.checkAuthStatus().pipe(
      tap((response) => {
        if (response?.user) {
          this.patchState({
            user: response.user,
            token: response.token,
            roles: response.user.roles,
            authStatus: AuthStatus.authenticated,
          });
          this.router.navigate(['/pages']);
        } else {
          this.setAuthStatus(AuthStatus.notAuthenticated);
        }
      }),
      catchError(() => {
        this.setAuthStatus(AuthStatus.notAuthenticated);
        return of(null);
      })
    );
  });

  readonly logout = this.effect<void>(($) =>
    $.pipe(
      tap(() => {
        console.log('entre');
        this.patchState({
          ...initialState,
          authStatus: AuthStatus.notAuthenticated,
        });
        localStorage.removeItem('token');
        this.router.navigate(['/auth']);
      })
    )
  );
}
