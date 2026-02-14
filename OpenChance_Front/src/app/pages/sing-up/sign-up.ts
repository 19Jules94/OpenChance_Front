import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { AuthPageComponent } from '../../ui/auth-page/auth-page.component';
import {
  email,
  form,
  FormField,
  minLength,
  pattern,
  required,
} from '@angular/forms/signals';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { AuthService } from '../../core/services/auth.service';
import { AuthFieldComponent } from '../../ui/auth-field/auth-field.component';
import { RegisterData } from '../../core/models/auth/register-user-request';

@Component({
  selector: 'sign-up',
  standalone: true,
  imports: [
    RouterModule,
    ReactiveFormsModule,
    FormField,
    AuthPageComponent,
    AuthFieldComponent,
    MatIconModule,
    MatSlideToggleModule,
  ],
  templateUrl: './sign-up.html',
  styleUrls: ['./sign-up.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignUpComponent {
  constructor(private authService: AuthService) {}

  serverErrors = signal<string[]>([]);

  loginModel = signal<RegisterData>({
    email: '',
    password: '',
    isCompany: false,
  });

  // =========================
  // FORM VALIDATION
  // =========================
  loginForm = form(this.loginModel, (fieldPath) => {
    required(fieldPath.email, {
      message: 'El correo es obligatorio',
    });

    email(fieldPath.email, {
      message: 'Introduce una dirección de correo válida',
    }); 
  });

  passwordValue() {
    return this.loginModel().password ?? '';
  }

  hasMinLength() {
    return this.passwordValue().length >= 8;
  }

  hasUppercase() {
    return /[A-Z]/.test(this.passwordValue());
  }

  hasNumber() {
    return /[0-9]/.test(this.passwordValue());
  }

  hasSymbol() {
    return /[^A-Za-z0-9]/.test(this.passwordValue());
  }

  // =========================
  // SUBMIT
  // =========================
  createUser(event: Event) {
    event.preventDefault();

    this.serverErrors.set([]);

    if (this.loginForm().invalid()) {
      this.loginForm.email().markAsTouched();
      this.loginForm.password().markAsTouched();
      return;
    }

    const { email, password, isCompany } = this.loginModel();

    const user = {
      email,
      password,
      role: isCompany ? 'Company' : 'User',
    };

    this.authService.signup(user).subscribe({
      next: () => {
        console.log('Usuario creado');
      },
      error: (err) => {
        this.serverErrors.set(
          err?.error?.errors ?? ['Error inesperado. Inténtalo de nuevo.']
        );
      },
    });
  }
  hide = signal(true);

  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }
}