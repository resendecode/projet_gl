import {Component, OnInit} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Project} from '../project/project';
import {ProjectService} from '../project/project.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-update-project',
  imports: [
    FormsModule,
    ReactiveFormsModule
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

  // à l'initialisation obtenir le projet que l'on a demandé à modifier
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.projectService.getProjectByID(this.id).subscribe(data => {
      console.log(this.id)
      this.project = data;
    }, error => console.log(error));
  }

  // lorsque le formulaire est validé mettre à jour le projet et revenir à la page principale
  onSubmit() {
    this.projectService.updateProject(this.project).subscribe(data => {
      this.goToProjectList();
    }, error => console.log(error));
  }

  // revenir à la page principale
  goToProjectList(){
    this.router.navigate(['/projects']);
    window.location.reload();
  }
}
