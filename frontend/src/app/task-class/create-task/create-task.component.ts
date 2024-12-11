import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Task} from '../task/task';
import {TaskService} from '../task/task.service';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-create-task',
  imports: [
    FormsModule
  ],
  templateUrl: './create-task.component.html',
  styleUrl: './create-task.component.css'
})
export class CreateTaskComponent implements OnInit{
  task : Task = new Task();

  constructor(private taskService :TaskService, private router : Router) {
  }

  ngOnInit():void {
  }

  onSubmit(){
    console.log(this.task);
    this.saveTask();
    this.goToProjectList();
  }

  saveTask(){
    this.taskService.createTask(this.task).subscribe(data =>{
        console.log(data);
        this.goToProjectList()
      },
      error => console.log(error)
    );
  }

  goToProjectList(){
    this.router.navigate(['/projects']);
  }
}
