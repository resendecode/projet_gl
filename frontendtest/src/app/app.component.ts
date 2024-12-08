import {UserListComponent} from './user-list/user-list.component';
import {TaskListComponent} from './task-list/task-list.component';
import {ProjectListComponent} from './project-list/project-list.component';
import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [CommonModule, UserListComponent, TaskListComponent, ProjectListComponent, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  title : string = 'Gestion des projets';
}
