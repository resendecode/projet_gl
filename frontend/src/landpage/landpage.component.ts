import { Component } from '@angular/core';
import {RouterLink, RouterLinkActive} from '@angular/router';

@Component({
  selector: 'app-landpage',
  imports: [
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './landpage.component.html',
  styleUrl: './landpage.component.css'
})
export class LandpageComponent {

}
