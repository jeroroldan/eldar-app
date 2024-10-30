import { UserDetailService } from './user-detail.service';
import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { Data, UserResponse } from '../models/user.interface';
import { catchError, EMPTY, Observable, switchMap, tap } from 'rxjs';

export interface UserListsState {
  user: Data| null;
  isLoading: boolean;
  showSkeleton: boolean;
  error: Error | null;
}

const initialState: UserListsState = {
  user: null,
  isLoading: false,
  showSkeleton: false,
  error: null,
};

@Injectable()
export class UserDetailStore extends ComponentStore<UserListsState> {
  constructor(private readonly userDetailService: UserDetailService) {
    super(initialState);
  }

  readonly user$: Observable<Data | null> = this.select(
    (state) => state.user
  );

  readonly getUserById = this.effect<string>((id$) =>
    id$.pipe(
      switchMap((id) =>
        this.userDetailService.getUserById(id).pipe(
          tap((resp) =>
            this.patchState({ user: resp as Data })
          ),
          catchError(() => EMPTY)
        )
      )
    )
  );
}
