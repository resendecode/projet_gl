import {Component, OnInit} from '@angular/core';
import {Task} from '../task-class/task';
import {NgForOf, NgIf} from '@angular/common';
import {TaskService} from '../task-class/task.service';

@Component({
  selector: 'app-task-list',
  imports: [
    NgForOf,
    NgIf
  ],
  providers : [TaskService],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})

export class TaskListComponent implements OnInit{

  taskService : TaskService;
  tasks : Task[] = [];

  constructor(taskService : TaskService) {
    this.taskService = taskService;
  }

  ngOnInit() : void {
    this.getTasks();
  }

  private getTasks() : void{
    // quand la BD marchera bien
    this.taskService.getTaskList()
      .subscribe(tasks => {
        this.tasks = tasks;
      }, error => {
        console.error('Error fetching tasks:', error);
        // Handle the error, e.g., display an error message to the user
      });
    //this.tasks = [new Task("001", "Faire le backend", "Coder le backend de l'appli xxx", "22/10/2023", "22/11/2023", true),
    //              new Task("002", "Faire le frontend", "Coder le frontend de l'appli xxx", "14/08/2024", "00/00/0000", false)];
  }

}
