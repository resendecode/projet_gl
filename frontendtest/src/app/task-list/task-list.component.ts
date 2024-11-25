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
  tasks ?: Task[];

  constructor(taskService : TaskService) {
    this.taskService = taskService;
  }

  ngOnInit() : void {
    this.getTasks();
  }

  private getTasks() : void{
    //this.userService.getUsersList().subscribe(data =>{
    //  this.users = data;
    //})
    this.tasks = [new Task("001", "Pipi", "faire pipi Impotant", "22/10/2023", "22/11/2023", true),
                  new Task("002", "Caca", "Faire caca fort", "14/08/2024", "00/00/0000", false)];
  }

}
