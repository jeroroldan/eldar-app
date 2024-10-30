import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  template: `
  <router-outlet/>
  `,
  imports:[ RouterModule ],
  standalone: true,
})
export class AuthLayoutComponent {}
