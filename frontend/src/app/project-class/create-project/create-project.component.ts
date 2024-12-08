import {Component, OnInit} from '@angular/core';
import {Project} from '../project/project';
import {FormsModule} from '@angular/forms';
import {ProjectService} from '../project/project.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-create-project',
  imports: [
    FormsModule
  ],
  templateUrl: './create-project.component.html',
  styleUrl: './create-project.component.css'
})

export class CreateProjectComponent implements OnInit{
  project : Project = new Project();

  constructor(private projectService : ProjectService, private router : Router) {
  }

  ngOnInit():void {
  }

  onSubmit(){
    console.log(this.project.nameP);
    this.saveProject();
  }

  saveProject(){
    this.projectService.createProject(this.project).subscribe(data =>{
        console.log(data);
        this.goToProjectList()
      },
        error => console.log(error)
    );
  }

  goToProjectList(){
    this.router.navigate(['/projects']);
  }
}
