import { Component, Input, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { FormField } from '@angular/forms/signals';

@Component({
  selector: 'app-auth-field',
  standalone: true,
  imports: [MatIconModule, FormField, FormField],
  templateUrl: './auth-field.component.html',
  styleUrls: ['./auth-field.component.scss'],
})
export class AuthFieldComponent {
  @Input() label = '';
  @Input() icon = '';
  @Input() type: 'text' | 'email' | 'password' = 'text';
  @Input({ required: true }) field!: any;

  hide = signal(true);

  toggleVisibility(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  get inputType() {
    if (this.type !== 'password') return this.type;
    return this.hide() ? 'password' : 'text';
  }
  get f() {
    return this.field?.();
  }

  markTouched() {
    this.f?.markAsTouched();
  }

  hasError() {
    return this.f?.touched() && this.f?.invalid();
  }

  errors() {
    return this.f?.errors() ?? [];
  }
  firstError() {
    return this.errors()[0];
  }
}
