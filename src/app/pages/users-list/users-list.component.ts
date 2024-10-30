import { Component, OnChanges, SimpleChanges } from '@angular/core';
import { UserListsStore } from './users-list.store';
import { AsyncPipe, NgFor } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { RouterLink } from '@angular/router';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { ToolbarUiComponent } from '../../shared/components/toolbar-ui/toolbar-ui.component';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { GlobalStore } from '../../shared/global.store';
import { CardUserComponent } from "../../shared/components/card-user/card-user.component";
import { UserDialogComponent } from "../../shared/components/user-dialog/user-dialog.component";
import { Data } from '../models/user.interface';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [
    NgFor,
    CardModule,
    AsyncPipe,
    ButtonModule,
    RouterLink,
    NgxSkeletonLoaderModule,
    ToolbarUiComponent,
    DialogModule,
    InputTextModule,
    CardUserComponent,
    UserDialogComponent,
  ],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss',
  providers: [UserListsStore],
})
export class UsersListComponent {
  public isvisible: boolean = false;
  public user: Data | null = null;
  protected vm$ = this.userListsStore.vm$;
  protected user$ = this.store.user$;
  constructor(
    private readonly userListsStore: UserListsStore,
    private readonly store: GlobalStore
  ) {
    this.userListsStore.loadData();
  }

  handleSearchValue(term: string | null) {
    this.userListsStore.loadFilteredUsers(term);
  }

  handleDataClick(user: Data | null) {
    this.user = user;
    this.isvisible = true;
  }

  handleToggleDialog(){
    this.isvisible = false;
  }

  logout() {
    this.store.logout();
  }
}
