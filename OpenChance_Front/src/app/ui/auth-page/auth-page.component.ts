import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AuthCardComponent } from '../auth-card/auth-card.component';

@Component({
  selector: 'app-auth-page',
  standalone: true,
  imports: [RouterModule, AuthCardComponent],
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.scss'],
})
export class AuthPageComponent {

  @Input() title = '';

  @Input() altText = '';
  @Input() altLink = '/';
  @Input() altLinkLabel = '';
}