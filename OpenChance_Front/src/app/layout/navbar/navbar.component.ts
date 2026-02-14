import { Component } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'navbar-component',
  standalone: true,
  templateUrl: 'navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  imports: [MatButtonModule, MatMenuModule,RouterModule],
})
export class NavBarComponent { }