import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ToastModule } from 'primeng/toast';
import { minLengthAsyncValidator } from '../../shared/validators/min-length.validators';
import { GlobalStore } from '../../shared/global.store';

interface UserLogin {
  password: string;
  email: string;
}


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterOutlet,
    CardModule,
    ButtonModule,
    CommonModule,
    ReactiveFormsModule,
    DividerModule,
    ToastModule,
    PasswordModule,
    InputTextModule,
  ],
  providers: [],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  public myForm!: FormGroup;

  constructor(private readonly fb: FormBuilder, private readonly store: GlobalStore) {
    this.initForm();
  }

  private initForm() {
    this.myForm = this.fb.group({
      email: ['pablito@gmail.com', [Validators.required, Validators.email]],
      password: ['123456', Validators.required, minLengthAsyncValidator(6)],
    });
  }

  login() {
    const { email, password } = this.myForm.value;
    this.store.login({ email, password });
  }

}
