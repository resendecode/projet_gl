import {Component, OnInit} from '@angular/core';
import {Project} from '../project/project';
import {NgForOf, NgIf} from '@angular/common';
import {ProjectService} from '../project/project.service';
import {Router, RouterLink, RouterLinkActive} from '@angular/router';
import {TaskService} from '../../task-class/task/task.service';
import {Task} from '../../task-class/task/task'

@Component({
  selector: 'app-project-list',
  imports: [
    NgForOf,
    RouterLink,
    RouterLinkActive,
    NgIf
  ],
  providers : [ProjectService],
  templateUrl: './project-list.component.html',
  styleUrl: './project-list.component.css'
})

export class ProjectListComponent implements OnInit {
  projects : Project[] = [];

  constructor(private projectService : ProjectService,
              private router:Router,
              private taskService : TaskService) {
  }

  // à l'initialisation obtenir les projets et toutes leurs infos
  ngOnInit() : void {
    // récuperer tous les projets
    this.getProjects();

    // récuperer toutes les tâches de chaque projet
    this.getAllProjectTasks();

    this.getProjectParticipants();
  }

  // obtenir tout les projects
  public getProjects() : void{
    this.projectService.getProjectList()
      .subscribe(projects => {
        this.projects = projects;
        console.log(this.projects);
      }, error => {
        console.error('Error fetching projects:', error);
        // Handle the error, e.g., display an error message to the user
      });
  }

  // todo : obtenir toutes les taches de chaque projet (peut etre pas ici mais dans taskService?)
  getProjectTasks(project : Project): void {
    this.taskService.getTasksByProjectId(project.project_id).subscribe(
      data => {
        project.tasks = data; // Assignation des tâches récupérées
        console.log('Tâches récupérées :', project.tasks);
      },
      error => {
        console.error('Erreur lors de la récupération des tâches :', error);
      }
    );
  }

  public getAllProjectTasks(){
    for(const project of this.projects) {
      this.getProjectTasks(project);
    }
  }

  //todo : obtenir tout les participants de chaque projet
  public getProjectParticipants(){
    this.projects.forEach(p => p.participants);
}

  // mettre à jour un projet (avec l'id)
  public updateProject(id : string){
    this.router.navigate(['update-project', id]);
  }

  //supprimer un project (avec l'id)
  public deleteProject(id : string){
    this.projectService.deleteProject(id).subscribe(data =>{
      console.log(data);
      this.getProjects();
    })
  }

  //mettre à jour une tâche du projet
  public updateTask(id : string){
    this.router.navigate(['update-task', id]);
  }

  //supprimer une tache
  public deleteTask(id : string){
    this.taskService.deleteTask(id);
  }
}


