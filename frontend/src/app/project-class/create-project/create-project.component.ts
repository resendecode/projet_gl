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

  toPayload(): any {
    return {
      project_id: this.project.project_id,
      name: this.project.name,
      done : this.project.done,
      start_date : this.project.startDate,
      deadline : this.project.deadline,
      description : this.project.description,
      participants : [],
      tasks : [],
    };
  }

  // todo : sauvegarder le projet crée
  saveProject() {
    const userPayload = this.toPayload();

    this.projectService.createProject(userPayload).subscribe(
      data => {
        console.log("Projet créé avec succès :", data);
        this.goToProjectList();
      },
      error => {
        console.error("Erreur lors de la création du projet :", error);
      }
    );
  }

  // retourner à la page principale
  goToProjectList(){
    this.router.navigate(['/projects']);
  }
}
