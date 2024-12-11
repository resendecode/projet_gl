import {Routes} from '@angular/router';
import {ProjectListComponent} from './project-class/project-list/project-list.component';
import {CreateProjectComponent} from './project-class/create-project/create-project.component';
import {UpdateProjectComponent} from "./project-class/update-project/update-project.component";
import {LoginComponent} from './auth/login/login.component';
import {AuthGuard} from './auth/guards/auth.guards';
import {CreateUserComponent} from './user-class/create-user/create-user.component';
import {LandpageComponent} from '../landpage/landpage.component';

export const routes: Routes = [
  {path: 'projects', component:ProjectListComponent, canActivate: [AuthGuard] },
  {path : 'projects/create-project', component:CreateProjectComponent, canActivate: [AuthGuard] },
  {path : 'update-project/:id', component:UpdateProjectComponent, canActivate: [AuthGuard] },
  {path : 'auth/login', component:LoginComponent},
  {path : 'create-user', component:CreateUserComponent},
  {path : '', component:LandpageComponent}
];
