import { UserListApiService } from './user-list-api.service';
import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { Data, UserResponse } from '../models/user.interface';
import { catchError, EMPTY, map, Observable, switchMap, tap } from 'rxjs';

export interface UserListsState {
  user: Data[] | null;
  userResponse: UserResponse | null;
  isLoading: boolean;
  showSkeleton: boolean;
  error: Error | null;
}

const initialState: UserListsState = {
  user: null,
  userResponse: null,
  isLoading: false,
  showSkeleton: false,
  error: null,
};

@Injectable()
export class UserListsStore extends ComponentStore<UserListsState> {
  constructor(private readonly userListApi: UserListApiService) {
    super(initialState);
  }


  readonly vm$ = this.select(
    ({
      showSkeleton,
      user
    }) => ({
      showSkeleton,
      user
    })
  );

  readonly loadData = this.effect((users$) =>
    users$.pipe(
      tap(() => this.patchState({ showSkeleton: true })),
      switchMap((id) =>
        this.userListApi.getUsers().pipe(
          tap((resp) =>
            this.patchState({
              userResponse: resp,
              user: resp.data,
              showSkeleton: false,
            })
          ),
          catchError(() => EMPTY)
        )
      )
    )
  );

  readonly loadFilteredUsers = this.effect<string | null>((term$) =>
    term$.pipe(
      switchMap((term) =>
        this.userListApi.getUsers().pipe(
          map((resp: UserResponse) => ({
            ...resp,
            data: resp.data.filter((user) => {
              if (!term) return true;
              const searchTermLower = term.toLowerCase();
              const fullName =
                `${user.first_name} ${user.last_name}`.toLowerCase();
              return (
                fullName.includes(searchTermLower) ||
                user.email.toLowerCase().includes(searchTermLower)
              );
            }),
          })),
          tap((filteredResp) => {
            this.patchState({
              userResponse: filteredResp,
              user: filteredResp.data,
              isLoading: false,
            });
          }),
          catchError((error) => {
            console.error('Error loading users:', error);
            this.patchState({
              isLoading: false,
              error: error,
              showSkeleton: false,
            });
            return EMPTY;
          })
        )
      )
    )
  );
}
