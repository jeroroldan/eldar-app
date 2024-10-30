import { Component, EventEmitter, Output, OnInit, Input } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { SplitButtonModule } from 'primeng/splitbutton';
import { InputTextModule } from 'primeng/inputtext';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { TooltipModule } from 'primeng/tooltip'; // Faltaba esta importación
import { distinctUntilChanged } from 'rxjs';
import { GlobalStore } from '../../global.store';
import { AsyncPipe, UpperCasePipe } from '@angular/common';
import { CapitalizePipe } from '../../pipes/capitalize.pipe';

@Component({
  selector: 'toolbar-ui',
  standalone: true,
  imports: [
    ToolbarModule,
    ButtonModule,
    SplitButtonModule,
    InputTextModule,
    ReactiveFormsModule,
    TooltipModule,
    AsyncPipe,
    CapitalizePipe,
  ],
  template: `
    <p-toolbar>
      <p class="text-user">Bienvenido: {{ name | capitalize }}</p>
      <div class="p-toolbar-group-center toolbar-center">
        <span class="p-input-icon-left">
          <i class="pi pi-search"></i>
          <input
            pInputText
            placeholder="Filtrar"
            [formControl]="searchField"
            [pTooltip]="'filtrar'"
          />
        </span>
      </div>

      <div class="p-toolbar-group-right">
        <p-button
          label="Logout"
          icon="pi pi-sign-out"
          (click)="logout()"
        ></p-button>
      </div>
    </p-toolbar>
  `,
  styles: [
    `
      .text-user {
        font-size: 1.5rem;
        margin: 0;
      }
      .toolbar-center {
        flex-grow: 1;
        display: flex;
        justify-content: center;
      }

      .p-toolbar-group-right {
        display: flex;
        align-items: center;
      }
    `,
  ],
})
export class ToolbarUiComponent implements OnInit {
  @Input() name: string = '';
  @Output() onSearchValueControl: EventEmitter<string | null> =
    new EventEmitter<string | null>();
  @Output() onLogout: EventEmitter<null> = new EventEmitter<null>();
  protected searchField = new FormControl('');

  constructor() {}

  ngOnInit() {
    this.getValueField();
  }

  getValueField() {
    this.searchField.valueChanges
      .pipe(distinctUntilChanged())
      .subscribe((value) => {
        this.onSearchValueControl.emit(value);
      });
  }

  logout() {
    this.onLogout.emit();
  }
}
