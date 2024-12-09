import {Component, OnInit} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Project} from '../project/project';
import {ProjectService} from '../project/project.service';
import {ActivatedRoute, Router} from '@angular/router';
import {TaskListComponent} from '../../task-class/task-list/task-list.component';

@Component({
  selector: 'app-update-project',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    TaskListComponent
  ],
  templateUrl: './update-project.component.html',
  styleUrl: './update-project.component.css'
})
export class UpdateProjectComponent implements OnInit{
  project : Project = new Project();
  id : string = '';

  constructor(private projectService : ProjectService,
              private route : ActivatedRoute,
              private router : Router) {
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.projectService.getProjectByID(this.id).subscribe(data => {
      this.project = data;
    }, error => console.log(error));
  }

  onSubmit() {
    this.projectService.updateProject(this.id, this.project).subscribe(data => {
      this.goToProjectList();
    }, error => console.log(error));
  }

  goToProjectList(){
    this.router.navigate(['/projects']);
  }
}
