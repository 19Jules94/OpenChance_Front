import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { AuthPageComponent } from '../../ui/auth-page/auth-page.component';
import { email, form, FormField, required } from '@angular/forms/signals';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { AuthService } from '../../core/services/auth.service';
import { AuthFieldComponent } from '../../ui/auth-field/auth-field.component';

interface RegisterData {
  email: string;
  password: string;
  isCompany: boolean;
}

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
    MatSlideToggleModule
  ],
  templateUrl: './sign-up.html',
  styleUrls: ['./sign-up.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignUpComponent {

  constructor(private authService: AuthService) {}

  loginModel = signal<RegisterData>({
    email: '',
    password: '',
    isCompany: false,
  });

  loginForm = form(this.loginModel, (fieldPath) => {
    required(fieldPath.email, { message: 'El correo es obligatorio' });
    email(fieldPath.email, { message: 'Introduce una dirección de correo válida' });
    required(fieldPath.password, { message: 'La contraseña es obligatoria' });
  });

  createUser(event: Event) {
    event.preventDefault();

    if (this.loginForm().invalid()) {
      return;
    }

    const { email, password, isCompany } = this.loginModel();

    const user = {
      email,
      password,
      role: isCompany ? 'Company' : 'User',
    };

    this.authService.signup(user).subscribe({
      next: (res) => console.log('Usuario creado', res),
      error: (err) => console.log('Error al crear el usuario', err),
    });
  }

  hide = signal(true);

  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }
}