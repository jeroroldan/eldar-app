import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environment';
import { UserResponse } from '../models/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UserListApiService {
  private BASE_URL = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getUsers(page?: number, perPage?: number): Observable<UserResponse> {
    const params = new HttpParams()
      .set('page', page !== undefined ? page.toString() : '1')
      .set('per_page', perPage !== undefined ? perPage.toString() : '6');

    return this.http.get<UserResponse>(`${this.BASE_URL}users`, { params });
  }
}
