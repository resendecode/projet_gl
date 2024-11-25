import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {UserListComponent} from './user-list/user-list.component';
import {TaskListComponent} from './task-list/task-list.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, UserListComponent, TaskListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  standalone : true
})

export class AppComponent {
  title = 'frontendtest';
}
