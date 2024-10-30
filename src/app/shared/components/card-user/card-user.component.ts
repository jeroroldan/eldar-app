import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { CardModule } from 'primeng/card';
import { Data } from '../../../pages/models/user.interface';

@Component({
  selector: 'app-card-user',
  standalone: true,
  imports: [RouterLink, AsyncPipe, CardModule],
  template: `
    <p-card
      [header]="user?.first_name"
      [subheader]="user?.last_name"
      [style]="{ width: '100%' }"
    >
      <ng-template pTemplate="header">
        <img alt="Card" [src]="user?.avatar" />
      </ng-template>
      <div class="user-info">
        <span>{{ user?.first_name }} {{ user?.last_name }}</span>
        <div class="icon-item" (onClick)="handleClickEvent(user ?? null)" >
          <button class="button-pencil" type="button">
            <span
              class="pi pi-pencil"
              style="color: #f34747; font-size: 2rem; cursor: pointer;"
            ></span>
          </button>
        </div>
      </div>
      <p>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptates
        deleniti dolorem quam, odio delectus suscipit. Assumenda cupiditate, aut
        incidunt, ex corporis dicta, harum consequuntur facere aspernatur quidem
        accusamus eligendi nesciunt!
      </p>
      <ng-template pTemplate="footer">
        <div class="flex gap-3 mt-1">
          <p-button
            label="Detalle"
            [routerLink]="'/pages/user-detail/' + user?.id"
            severity="help"
          ></p-button>
        </div>
      </ng-template>
    </p-card>
  `,
  styles: [
    `
      .button-pencil {
        border: none;
        background: #fff;
      }
    `,
  ],
})
export class CardUserComponent {
  @Input() user: Data | null = null;
  @Output() onClickEvent: EventEmitter<Data | null> = new EventEmitter<Data | null>();

  handleClickEvent(user: Data | null){
      this.onClickEvent.emit(user)
  }
}
