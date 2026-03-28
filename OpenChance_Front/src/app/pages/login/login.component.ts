import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { AuthPageComponent } from '../../ui/auth-page/auth-page.component';
import {form } from '@angular/forms/signals';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { AuthService } from '../../core/services/auth.service';
import { AuthFieldComponent } from '../../ui/auth-field/auth-field.component';
import { LoginData } from '../../core/models/auth/login-user.request';

@Component({
  selector: 'login',
  standalone: true,
  imports: [
    RouterModule,
    ReactiveFormsModule,
    AuthPageComponent,
    AuthFieldComponent,
    MatIconModule,
    MatSlideToggleModule,
 
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  constructor(private authService: AuthService) {}

  serverErrors = signal<string[]>([]);

  loginModel = signal<LoginData>({
    email: '',
    password: '',
  });
  loginForm = form(this.loginModel);
  loginUser(event: Event) {
    event.preventDefault();

    this.serverErrors.set([]);

    const { email, password } = this.loginModel();
    const user = {
      email,
      password,
    };

    this.authService.login(user).subscribe({
      next: (res) => console.log('Inicio de sesión correcto', res),
      error: (err) => {
        this.serverErrors.set(err?.error?.errors ?? ['Error inesperado. Inténtalo de nuevo.']);
      },
    });
  }
  hide = signal(true);

  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }
}
