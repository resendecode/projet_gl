import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
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
  tasks : Task[] = [];
  task : Task = new Task();
  projectId : string = '';

  constructor(private taskService :TaskService,
              private router : Router,
              private route : ActivatedRoute) {
  }

  ngOnInit():void {
    this.route.paramMap.subscribe(params => {
      this.projectId = params.get('id') || ''; // Récupère l'ID ou une chaîne vide
    });
  }

  onSubmit(){
    console.log(this.task);
    this.saveTask();
  }


  toPayload(): any {
    return {
      id: this.task.id,
      title: this.task.title,
      done : this.task.done,
      description : this.task.description,
      project_id : this.task.project_id,
    };
  }

  saveTask() {
    const taskPayload = this.toPayload();

    this.taskService.createTask(taskPayload).subscribe(
      data => {
        console.log("Tache créé avec succès :", data);
        this.goToProjectList();
      },
      error => {
        console.error("Erreur lors de la création de la tache :", error);
      }
    );
  }

  goToProjectList(){
    this.router.navigate(['/projects']);
  }
}
