import {Component, OnInit} from '@angular/core';
import {Project} from '../project/project';
import {NgForOf, NgIf} from '@angular/common';
import {ProjectService} from '../project/project.service';
import {Router, RouterLink, RouterLinkActive} from '@angular/router';
import {TaskService} from '../../task-class/task/task.service';
import {Task} from '../../task-class/task/task'
import {UserService} from '../../user-class/user/user.service';
import {catchError, forkJoin, map, Observable, of} from 'rxjs';
import {User} from '../../user-class/user/user';

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
              private taskService : TaskService,
              private userService : UserService) {
  }

  // à l'initialisation obtenir les projets et toutes leurs infos
  ngOnInit() : void {
    // récuperer tous les projets
    this.getProjects();

    // récuperer toutes les tâches de chaque projet
    this.getAllProjectTasks();

    this.getProjectsWithParticipants();
    console.log("projets :", this.projects);
  }

  // obtenir tous les projects
  public getProjects() : void{
    this.projectService.getProjectList()
      .subscribe(projects => {
        this.projects = projects;
      }, error => {
        console.error('Error fetching projects:', error);
        // Handle the error, e.g., display an error message to the user
      });
  }

  // todo : obtenir toutes les taches de chaque projet (peut etre pas ici mais dans taskService?)
  public getProjectTasks(project : Project): void {
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

  public getProjectsWithParticipants(): void {
    this.enrichProjectsWithParticipants()
      .subscribe(projects => {
        this.projects = projects;
        console.log('Projets enrichis avec participants :', this.projects);
      }, error => {
        console.error('Erreur lors de la récupération des projets enrichis :', error);
      });
  }

  // obtenir tous les participants de chaque projet
  enrichProjectsWithParticipants(): Observable<Project[]> {
    return forkJoin({
      projects: this.projectService.getProjectList(),     // Méthode qui retourne les projets
      users: this.userService.getUserList()              // Méthode qui retourne tous les utilisateurs
    }).pipe(
      map(({ projects, users }) => {
        // Parcourir chaque projet
        projects.forEach((project: Project) => {
          // Trouver les utilisateurs qui participent à ce projet
          const participants = users.filter((user: User) =>
            Array.from(user.projects).some(userProject => userProject.project_id === project.project_id)
          );

          // Ajouter les participants au projet
          project.participants = Array.from(new Set(participants));
          console.log("projects :", projects);
          console.log("participants :", participants);
        });
        return projects; // Retourner la liste enrichie des projets
      }),
      catchError(error => {
        console.error('Erreur lors de l’enrichissement des projets :', error);
        return of([]); // Retourner un tableau vide en cas d'erreur
      })
    );
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

  public updateUser(id : string){
    this.router.navigate(['update-user', id]);
  }
}


