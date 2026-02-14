import { Component } from '@angular/core';
import { OfferCardComponent } from "../../ui/offered-card/offered-card.component";


@Component({
  selector: 'app-landing',
  standalone: true,
  
  templateUrl: './landing.html',
  styleUrls: ['./landing.scss'],
  imports: [OfferCardComponent],
})
export class LandingComponent {}
