import { Component, Input, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { FormField } from '@angular/forms/signals';

@Component({
  selector: 'app-auth-field',
  standalone: true,
  imports: [MatIconModule, FormField],
  templateUrl: './auth-field.component.html',
  styleUrls: ['./auth-field.component.scss'],
})
export class AuthFieldComponent {

  @Input() label = '';
  @Input() icon = '';
  @Input() type: 'text' | 'email' | 'password' = 'text';

  // para signals forms
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
}