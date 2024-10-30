import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GlobalStore } from '../shared/global.store';
import { AsyncPipe } from '@angular/common';

@Component({
  template: `

    <router-outlet />

  `,
  imports: [RouterModule,AsyncPipe],
  standalone: true,
})
export class UserLayoutComponent {

  constructor() {
  }
}
