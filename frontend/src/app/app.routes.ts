import {Routes} from '@angular/router';
import {ProjectListComponent} from './project-class/project-list/project-list.component';
import {CreateProjectComponent} from './project-class/create-project/create-project.component';
import {UpdateProjectComponent} from "./project-class/update-project/update-project.component";
import {LoginComponent} from './auth/login/login.component';
import {AuthGuard} from './auth/guards/auth.guards';
import {CreateUserComponent} from './user-class/create-user/create-user.component';
import {LandpageComponent} from '../landpage/landpage.component';
import {CreateTaskComponent} from './task-class/create-task/create-task.component';
import {UpdateTaskComponent} from './task-class/update-task/update-task.component';

export const routes: Routes = [
  {path: 'projects', component:ProjectListComponent}, // rajouter canActivate: [AuthGuard]
  {path : 'projects/create-project', component:CreateProjectComponent}, //idem
  {path : 'update-project/:id', component:UpdateProjectComponent}, // idem
  {path : 'update-task/:id', component: UpdateTaskComponent}, // i
  {path : 'projects/create-task', component:CreateTaskComponent}, // i
  {path : 'auth/login', component:LoginComponent},
  {path : 'create-user', component:CreateUserComponent},
  {path : '', component:LandpageComponent}
];
