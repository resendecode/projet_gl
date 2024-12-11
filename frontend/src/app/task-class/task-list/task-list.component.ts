import {Component, OnInit} from '@angular/core';
import {Task} from '../task/task';
import {NgForOf, NgIf} from '@angular/common';
import {TaskService} from '../task/task.service';
import {Router} from '@angular/router';

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
  tasks : Task[] = [];

  constructor(private taskService: TaskService, private router:Router) {
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
  }

  public updateTask(id : string){
    this.router.navigate(['update-task', id]);
  }

  public deleteTask(id : string){
    this.taskService.deleteTask(id).subscribe(data =>{
      console.log(data);
      this.getTasks();
    })
  }
}
