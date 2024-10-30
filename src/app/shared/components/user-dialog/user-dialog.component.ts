import { Component, Input, Output } from '@angular/core';
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
      header="Edit Profile"
      [modal]="true"
      [(visible)]="isVisible"
      [style]="{ width: '25rem' }"
    >
      <span class="p-text-secondary block mb-5">{{ user.avatar }}</span>
      <div class="flex align-items-center gap-3 mb-3">
        <label for="username" class="font-semibold w-6rem">{{
          user.first_name
        }}</label>
        <input pInputText id="username" class="flex-auto" autocomplete="off" />
      </div>
      <div class="flex align-items-center gap-3 mb-5">
        <label for="email" class="font-semibold w-6rem">{{ user.email }}</label>
        <input pInputText id="email" class="flex-auto" autocomplete="off" />
      </div>
      <div class="flex justify-content-end gap-2">
        <p-button
          label="Cancel"
          severity="secondary"
          (onClick)="isVisible = false"
        />
        <p-button label="Save" (onClick)="isVisible = false" />
      </div>
    </p-dialog>
    }
  `,
})
export class UserDialogComponent {
  @Input() user: Data | null = null;
  @Input() isVisible: boolean = false;
}
