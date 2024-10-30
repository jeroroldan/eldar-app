import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from '../../../environment';

export interface User {
  _id: string;
  email: string;
  name: string;
  isActive: boolean;
  roles: string[];
  __v: number;
}

export interface AuthResponse {
  user: User;
  token: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authStatus() {
    throw new Error('Method not implemented.');
  }
  private readonly baseUrl = environment.BASE_URL;

  constructor(private http: HttpClient, private router: Router) {}

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An error occurred';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = error.error?.message || `Error Code: ${error.status}`;
    }
    return throwError(() => new Error(errorMessage));
  }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  checkAuthStatus(): Observable<AuthResponse> {
    return this.http
      .get<AuthResponse>(`${this.baseUrl}check-token`, {
        headers: this.getAuthHeaders(),
      })
      .pipe(catchError(this.handleError));
  }

  login(credentials: {
    email: string;
    password: string;
  }): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.baseUrl}login`, credentials)
      .pipe(catchError(this.handleError));
  }
}
