import { Routes } from '@angular/router';
import {ProjectListComponent} from './project-class/project-list/project-list.component';
import {CreateProjectComponent} from './project-class/create-project/create-project.component';
import {UpdateProjectComponent} from "./project-class/update-project/update-project.component";

export const routes: Routes = [
  {path: 'projects', component:ProjectListComponent},
  {path : 'create-project', component:CreateProjectComponent},
  {path : '', redirectTo:'projects', pathMatch : 'full'},
  {path : 'update-project/:id', component:UpdateProjectComponent}

];
