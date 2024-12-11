import {Component, OnInit} from '@angular/core';
import {Project} from '../project/project';
import {NgForOf} from '@angular/common';
import {ProjectService} from '../project/project.service';
import {Router, RouterLink, RouterLinkActive} from '@angular/router';

@Component({
  selector: 'app-project-list',
  imports: [
    NgForOf,
    RouterLink,
    RouterLinkActive
  ],
  providers : [ProjectService],
  templateUrl: './project-list.component.html',
  styleUrl: './project-list.component.css'
})

export class ProjectListComponent implements OnInit {
  projects : Project[] = [];

  constructor(private projectService : ProjectService, private router:Router) {
  }

  // à l'initialisation obtenir les projets et toutes leurs infos
  ngOnInit() : void {
    this.getProjects();
    this.getProjectTasks();
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
  public getProjectTasks():void {
    this.projects.forEach(p => p.tasks);
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
}


