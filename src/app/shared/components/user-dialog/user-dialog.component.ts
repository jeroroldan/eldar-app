import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { CardUserComponent } from '../card-user/card-user.component';
import { ButtonModule } from 'primeng/button';
import { Data } from '../../../pages/models/user.interface';

@Component({
  selector: 'app-user-dialog',
  standalone: true,
  imports: [DialogModule, InputTextModule, CardUserComponent, ButtonModule],
  template: `
    @if(user){
    <p-dialog
      header="Edición de Usuario"
      [modal]="true"
      [(visible)]="isShowModal"
      [style]="{ width: '25rem', textAlign: 'center' }"
      [closable]="false"
    >
      <div class="p-d-flex p-jc-center p-ai-center p-mb-3">
        <img [src]="user.avatar" alt="Avatar" class="user-avatar" />
      </div>
      <div class="p-d-flex p-ai-center p-mb-3">
        <label for="username" class="p-mr-2 font-semibold w-6rem"
          ><span class="weight-text">Nombre: </span> {{ user.first_name }}</label
        >
      </div>
      <div class="p-d-flex p-ai-center p-mb-5">
        <label for="email" class="p-mr-2 font-semibold w-6rem"
          ><span class="weight-text">Email:</span> {{ user.email }}</label
        >
      </div>
      <div class="p-d-flex mt-2 p-jc-end p-gap-2">
        <p-button
          label="Cancelar"
          severity="secondary"
          (click)="handleCloseDialog()"
        ></p-button>
      </div>
    </p-dialog>
    }
  `,
  styles: [
    `
      .user-avatar {
        padding: 1rem;
        margin: auto;
        width: 20rem;
        height: 20rem;
        border-radius: 50%;
      }

      .weight-text {
        font-weight: 900;
      }
    `,
  ],
})
export class UserDialogComponent {
  public isShowModal: boolean = false;
  @Input() user: Data | null = null;
  @Input() set isVisible(value: boolean) {
    this.isShowModal = value;
  }
  @Output() onCloseClickDialog = new EventEmitter<void>();

  handleCloseDialog() {
    this.onCloseClickDialog.emit();
    this.isShowModal = false;
  }
}
