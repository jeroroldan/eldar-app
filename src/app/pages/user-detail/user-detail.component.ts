import { Component } from '@angular/core';
import { UserDetailStore } from './user-detail.store';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

@Component({
  selector: 'app-user-datail',
  standalone: true,
  imports: [
    CardModule,
    AsyncPipe,
    ButtonModule,
    RouterLink,
    NgxSkeletonLoaderModule,
  ],
  template: `
    @if(user$ | async; as user) {
    <div class="container">
      <p-card [header]="user.first_name" [subheader]="user.last_name">
        <ng-template pTemplate="header">
          <img alt="Card" class="image" [src]="user.avatar" />
        </ng-template>
        <div class="user-info">
          <span>{{ user.first_name }} {{ user.last_name }}</span>
          <div class="icon-item">
            <span
              class="pi pi-pencil"
              style="color: #f34747; font-size: 2rem; cursor: pointer;"
            ></span>
          </div>
        </div>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptates
          deleniti dolorem quam, odio delectus suscipit. Assumenda cupiditate,
          aut incidunt, ex corporis dicta, harum consequuntur facere aspernatur
          quidem accusamus eligendi nesciunt!
        </p>
        <ng-template pTemplate="footer">
          <div class="flex gap-3 mt-1">
            <p-button
              label="Volver"
              [routerLink]="'/pages/user-list'"
              severity="danger"
            >
              <span class="pi pi-arrow-left mr-1"></span>
            </p-button>
          </div>
        </ng-template>
      </p-card>
    </div>
    }@else {
    <div class="container">
      <p-card>
        <ng-template pTemplate="header">
          <ngx-skeleton-loader count="6" appearance="line" />
        </ng-template>
        <div class="user-info">
          <ngx-skeleton-loader count="1" appearance="line" />
          <div class="icon-item">
            <ngx-skeleton-loader count="1" appearance="line" />
          </div>
        </div>
        <p>
          <ngx-skeleton-loader count="5" appearance="line" />
        </p>
        <ng-template pTemplate="footer">
          <div class="flex gap-3 mt-1">
            <ngx-skeleton-loader count="1" appearance="line" />
          </div>
        </ng-template>
      </p-card>
    </div>
    }
  `,
  styles: [
    `
      .container {
        padding: 16px;
        display: flex;
        justify-content: center;
      }

      p-card {
        width: 100%;
        max-width: 400px;
        margin: 16px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        border-radius: 8px;
      }

      .image {
        width: 100%;
        height: auto;
        border-radius: 8px 8px 0 0;
      }

      .user-info {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin: 16px 0;
      }

      .icon-item {
        margin-left: 8px;
        cursor: pointer;
      }

      .flex {
        display: flex;
        gap: 8px;
      }
    `,
  ],
  providers: [UserDetailStore],
})
export class UserDatailComponent {
  public userId: string | null = null;
  protected user$ = this.store.user$;

  constructor(
    private route: ActivatedRoute,
    private readonly store: UserDetailStore
  ) {
    this.getIdByParams();
    this.initData();
  }

  private getIdByParams() {
    this.route.params.subscribe((params) => {
      this.userId = params['id'];
    });
  }

  private initData(): void {
    if (this.userId) this.store.getUserById(this.userId);
  }
}
