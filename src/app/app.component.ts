import { AsyncPipe, CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToolbarUiComponent } from "./shared/components/toolbar-ui/toolbar-ui.component";
import { AuthService } from './auth/auth.service';
import { GlobalStore } from './shared/global.store';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, ToolbarUiComponent,AsyncPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers:[AuthService]
})
export class AppComponent {
  constructor(  ){

  }

}
