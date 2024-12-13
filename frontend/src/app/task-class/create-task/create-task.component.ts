import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Task} from '../task/task';
import {TaskService} from '../task/task.service';
import {FormsModule} from '@angular/forms';
import {ProjectService} from '../../project-class/project/project.service';
import { v4 as uuidv4 } from 'uuid';

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

  constructor(private taskService :TaskService,
              private router : Router,
              private route : ActivatedRoute,
              private projectService : ProjectService) {
  }

  ngOnInit(): void {
    this.task = new Task();
    this.route.paramMap.subscribe(params => {
      const projectId = params.get('id');
      if (projectId) {
        this.task.project_id = projectId;
        console.log(this.task.project_id);
      } else console.log("erreur project_id");
    });
  }

  onSubmit(){
    console.log("tache :", this.task);
    this.saveTask();
  }


  toPayload(): any {
    return {
      id: this.task.id, // Ajoutez seulement si nécessaire
      title: this.task.title,
      done: this.task.done,
      description: this.task.description,
      project_id: this.task.project_id,
    };
  }

  // todo : gros probleme "given id must be not null" dans createTask
  saveTask() {
    const taskPayload = this.toPayload();
    console.log("Payload envoyé au backend", taskPayload);

    this.taskService.createTask(taskPayload).subscribe(
      (data) => {
        console.log("Tache créée avec succès :", data);
        this.bindTaskToProject();
        this.goToProjectList();
      },
      (error) => console.error("Erreur lors de la création de la tâche :", error)
    );
  }

  bindTaskToProject(){
    this.projectService.getProjectByID(this.task.project_id).subscribe(
      data =>{
        data.tasks.push(this.task);
        this.projectService.updateProject(data).subscribe(
          data=> console.log("tache ajoutée au projet correspondant :", data)
        )
      },
      error => console.log("erreur d'ajout de la tâche au project correspondant", error)
    )
  }
  goToProjectList(){
    this.router.navigate(['/projects']);
    window.location.reload();
  }
}
