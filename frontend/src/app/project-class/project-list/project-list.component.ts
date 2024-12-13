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
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-project-list',
  imports: [
    NgForOf,
    RouterLink,
    RouterLinkActive,
    NgIf,
    FormsModule
  ],
  providers : [ProjectService],
  templateUrl: './project-list.component.html',
  styleUrl: './project-list.component.css'
})

export class ProjectListComponent implements OnInit {
  projects : Project[] = [];
  allUsers : User[] = [];
  selectedUser : User = new User();

  constructor(private projectService : ProjectService,
              private router:Router,
              private taskService : TaskService,
              private userService : UserService) {
  }

  // à l'initialisation obtenir les projets et toutes leurs infos
  ngOnInit() : void {
    this.userService.getUserList().subscribe(data => {
      this.allUsers = data;
    }, error => {
      console.error('Erreur lors de la récupération des utilisateurs :', error);
    })

    // récuperer tous les projets
    this.getProjects();

    // récuperer toutes les tâches de chaque projet
    this.getProjectsWithTasks();

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

  //obtenir les projets avec tous leurs participants
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

  //ajouter les participants choisis
  addUserToProject(projet_id: string): void {
    // Trouver le projet correspondant à l'ID
    let project: Project | undefined = this.projects.find(project => project.project_id === projet_id);

    if (this.selectedUser) {
      // Vérifier si un utilisateur est sélectionné
      if (project) {
        project.participants = project.participants ?? [];

        // Vérifier si l'utilisateur n'est pas déjà ajout dans la liste locale
        if (!project.participants.some(participant => participant.user_id === this.selectedUser.user_id)) {
          // Ajouter localement
          project.participants.push(this.selectedUser);

          // Appeler la méthode HTTP pour enregistrer dans le backend
          this.projectService.saveParticipantsProject(project.project_id, this.selectedUser.user_id)
            .subscribe(
              response => {
                // Succès côté backend
                console.log(`${this.selectedUser.name} a été ajouté au projet (${project.project_id}) dans la base de données.`);
              },
              error => {
                // En cas d'erreur côté backend, retirer l'utilisateur localement
                console.error('Erreur lors de l\'ajout au backend :', error);
                project.participants = project.participants.filter(
                  participant => participant.user_id !== this.selectedUser.user_id
                );
              }
            );

          console.log(`${this.selectedUser.name} a été ajouté au projet localement.`);
        } else {
          // Si l'utilisateur est déjà dans la liste
          console.warn(`${this.selectedUser.name} est déjà un participant.`);
        }
      } else {
        console.warn(`Le projet avec ID ${projet_id} est introuvable.`);
      }
    } else {
      console.warn('Aucun utilisateur sélectionné.');
    }
  }

  //obtenir les projects avec leurs tâches
  public getProjectsWithTasks(): void {
    this.enrichProjectsWithTasks()
      .subscribe(projects => {
        this.projects = projects;
        console.log('Projets enrichis avec les taches :', this.projects);
      }, error => {
        console.error('Erreur lors de la récupération des projets enrichis :', error);
      });
  }

  //ajouter les tâches à la liste des tâches du projet correspondant
  enrichProjectsWithTasks(): Observable<Project[]> {
    return forkJoin({
      projects: this.projectService.getProjectList(),     // Méthode qui retourne les projets
      tasks: this.taskService.getTaskList()            // Méthode qui retourne tous les utilisateurs
    }).pipe(
      map(({ projects, tasks }) => {
        // Parcourir chaque projet
        projects.forEach((project: Project) => {
          // Trouver les utilisateurs qui participent à ce projet
          const participants = tasks.filter((task: Task) =>
            task.project_id === project.project_id
          );

          // Ajouter les participants au projet
          project.tasks = Array.from(new Set(tasks));
          console.log("projects :", projects);
          console.log("tasks :", tasks);
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

  //todo : mettre à jour un utilisateur (son profil)
  public updateUser(id : string){
    this.router.navigate(['update-user', id]);
  }
}


