import { Routes } from '@angular/router';
import {ProjectListComponent} from './project-list/project-list.component';
import {CreateProjectComponent} from './create-project/create-project.component';

export const routes: Routes = [
  {path: 'projects', component:ProjectListComponent},
  {path : 'create-project', component:CreateProjectComponent},
  {path : '', redirectTo:'projects', pathMatch : 'full'}

];
