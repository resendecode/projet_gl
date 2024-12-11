import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterOutlet} from '@angular/router';
import {AuthRoutingModule} from './auth/auth-routing.module';

@Component({
  selector: 'app-root',
  imports: [CommonModule,
    RouterOutlet,
    AuthRoutingModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  title : string = 'Gestion des projets';
}
