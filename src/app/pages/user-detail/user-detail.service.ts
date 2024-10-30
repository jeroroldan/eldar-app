import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Data } from '@angular/router';
import { map, Observable } from 'rxjs';
import { environment } from '../../../../environment';
import { UserDetailResponse } from './user-detail.interface';


@Injectable({
  providedIn: 'root',
})
export class UserDetailService {
  private BASE_URL = environment.apiUrl;
  constructor(private http: HttpClient) {}

  getUserById(id: string): Observable<Data> {
    return this.http
      .get<UserDetailResponse>(`${this.BASE_URL}users/${id}`)
      .pipe(map((resp) => resp.data));
  }
}
