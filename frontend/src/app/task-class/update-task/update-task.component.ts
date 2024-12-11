import {Component, OnInit} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Task} from '../task/task';
import {TaskService} from '../task/task.service';

@Component({
  selector: 'app-update-task',
  imports: [
    FormsModule
  ],
  templateUrl: './update-task.component.html',
  styleUrl: './update-task.component.css'
})
export class UpdateTaskComponent implements OnInit{
  task : Task = new Task();
  id : string = '';

  constructor(private taskService : TaskService,
              private route : ActivatedRoute,
              private router : Router) {
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.taskService.getTaskByID(this.id).subscribe(data => {
      this.task = data;
    }, error => console.log(error));
  }

  onSubmit() {
    this.taskService.updateTask(this.id, this.task).subscribe(data => {
      this.goToProjectList();
    }, error => console.log(error));
  }

  goToProjectList(){
    this.router.navigate(['/projects']);
  }
}
