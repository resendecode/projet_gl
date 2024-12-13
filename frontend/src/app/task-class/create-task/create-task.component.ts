import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Task} from '../task/task';
import {TaskService} from '../task/task.service';
import {FormsModule} from '@angular/forms';
import {ProjectService} from '../../project-class/project/project.service';
import {Project} from '../../project-class/project/project';
import {concatMap} from 'rxjs';

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
        this.task.project.project_id = projectId;
        console.log("task.project_id", this.task.project.project_id);
      } else console.log("erreur project_id");
    });
  }

  onSubmit(){
    console.log("tache :", this.task);
    this.saveTask();
  }


  toPayload(): any {
    return {
      title: this.task.title,
      done: this.task.done,
      description: this.task.description,
      project_id: this.task.project.project_id,
      resp_id: 1
    };
  }

  saveTask() {
    const taskPayload = this.toPayload();
    console.log("Payload envoyé au backend", taskPayload);

    this.taskService.createTask(taskPayload).subscribe(
      (createdTask) => {
        console.log("Tâche créée avec succès :", createdTask);

        // Mettre à jour les détails de `this.task` avec la réponse du backend
        this.task.id = createdTask.id; // Récupère l'ID généré
        this.task.title = createdTask.title;
        this.task.description = createdTask.description;
        this.task.done = createdTask.done;
        this.task.project.project_id = createdTask.project_id;
        this.task.user_id = createdTask.resp;

        this.bindTaskToProject();

        // Naviguer vers la liste des projets
        this.goToProjectList();
      },
      (error) => {
        console.error("Erreur lors de la création de la tâche :", error);
      }
    );
  }


  bindTaskToProject() {
    if (!this.task.project.project_id) {
      console.error("Aucun project_id associé à la tâche !");
      return;
    }

    this.projectService.getProjectByID(this.task.project.project_id).pipe(
      concatMap((project: Project) => {
        if (!project) {
          throw new Error("Le projet est introuvable pour l'ID fourni : " + this.task.project.project_id);
        }

        if (!Array.isArray(project.tasks)) {
          project.tasks = [];
        }

        project.tasks = [...project.tasks, this.task];
        return this.projectService.updateProject(project);
      })
    ).subscribe(
      (updatedProject) => console.log("Tâche ajoutée au projet :", updatedProject),
      (error) => console.error("Erreur lors de l'ajout de la tâche au projet :", error)
    );
  }

  goToProjectList(){
    this.router.navigate(['/projects']);
  }
}
