import {Component, OnInit} from '@angular/core';
import {Task} from '../task/task';
import {NgForOf, NgIf} from '@angular/common';
import {TaskService} from '../task/task.service';

@Component({
  selector: 'app-task-list',
  imports: [
    NgForOf,
    NgIf
  ],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css',
  standalone : true
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
    //this.taskService.getTasksList().subscribe(data =>{
    //  this.tasks = data;
    //})
    this.tasks = [new Task("001", "Faire le backend", "Coder le backend de l'appli xxx", "22/10/2023", "22/11/2023", true),
                  new Task("002", "Faire le frontend", "Coder le frontend de l'appli xxx", "14/08/2024", "00/00/0000", false)];
  }

}
