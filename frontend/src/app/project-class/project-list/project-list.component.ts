import {Component, OnInit} from '@angular/core';
import {Project} from '../project/project';
import {NgForOf, NgIf} from '@angular/common';
import {ProjectService} from '../project/project.service';
import {User} from '../../user-class/user/user';
import {TaskListComponent} from '../../task-class/task-list/task-list.component';
import {Task} from '../../task-class/task/task';
import {Router, RouterLink, RouterLinkActive} from '@angular/router';

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
  projects : Project[] = [];

  constructor(private projectService : ProjectService, private router:Router) {
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
  }

  public getProjectTasks():void {
    this.projects.forEach(p => p.tasks);
  }

  public updateProject(id : string){
    this.router.navigate(['update-project', id]);
  }

  public deleteProject(id : string){
    this.projectService.deleteProject(id).subscribe(data =>{
      console.log(data);
      this.getProjects();
    })
  }
}


