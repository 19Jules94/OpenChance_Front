import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavBarModule } from "./navbar/navbar.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavBarModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('OpenChance_Front');
}
