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

  // lorque le formulaire est rempli, enregistrer le projet et retourner à la page principale
  onSubmit(){
    console.log(this.project);
    this.saveProject();
    this.goToProjectList();
  }

  // sauvegarder un projet dans la BD
  saveProject(){
    this.projectService.createProject(this.project).subscribe(data =>{
        console.log(data);
        this.goToProjectList();
        this.projectService.getProjectList();
      },
        error => console.log(error)
    );
  }

  // retourner à la page principale
  goToProjectList(){
    this.router.navigate(['/projects']);
  }
}
