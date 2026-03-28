import { Component } from '@angular/core';
import { OfferCardComponent } from "../../ui/offered-card/offered-card.component";
import { AuthService } from '../../core/services/auth.service';


@Component({
  selector: 'app-landing',
  standalone: true,
  
  templateUrl: './landing.html',
  styleUrls: ['./landing.scss'],
  imports: [OfferCardComponent],
})
export class LandingComponent {
  constructor(private authService: AuthService) {}

  testInterceptor() {
    this.authService.testInterceptor().subscribe({
      next: res => console.log("Respuesta:", res),
      error: err => console.error("Error:", err)
    });
  }
}

