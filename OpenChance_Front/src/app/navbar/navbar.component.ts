import {Component} from '@angular/core';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'navbar-component',
  templateUrl: 'navbar.component.html',
  imports: [MatButtonModule, MatMenuModule],
})
export class NavBarModule {}