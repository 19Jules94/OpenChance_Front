import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {  NavBarComponent } from "./layout/navbar/navbar.component";


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavBarComponent],
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('OpenChance_Front');
}
