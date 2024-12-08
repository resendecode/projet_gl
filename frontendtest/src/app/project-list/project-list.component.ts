import {Component, OnInit} from '@angular/core';
import {Project} from '../project/project';
import {NgForOf, NgIf} from '@angular/common';
import {ProjectService} from '../project/project.service';
import {User} from '../user/user';
import {TaskListComponent} from '../task-list/task-list.component';
import {Task} from '../task/task';
import {RouterLink, RouterLinkActive} from '@angular/router';

@Component({
  selector: 'app-project-list',
  imports: [
    NgForOf,
    NgIf,
    RouterLink,
    RouterLinkActive
  ],
  providers : [ProjectService],
  templateUrl: './project-list.component.html',
  styleUrl: './project-list.component.css'
})

export class ProjectListComponent implements OnInit {
  projectService : ProjectService;
  projects : Project[] = [];

  constructor(projectService : ProjectService) {
    this.projectService = projectService;
  }

  ngOnInit() : void {
    this.getProjects();
    this.getProjectTasks();
  }

  public getProjects() : void{
    // quand la BD marchera bien
    this.projectService.getProjectList()
      .subscribe(projects => {
        this.projects = projects;
      }, error => {
        console.error('Error fetching projects:', error);
        // Handle the error, e.g., display an error message to the user
      });
    //let p1 = new Project();
    //p1.nameP = "Appli uber";
    //p1.startDateP   = "10/10/2023";
    //this.projects.push(p1);
  }

  public getProjectTasks():void {
    this.projects.forEach(p => p.tasks.forEach(t => t = new Task("001", "Faire le backend", "Coder le backend de l'appli xxx", "22/10/2023", "22/11/2023", true)));
  }
}


