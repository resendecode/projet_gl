import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, forkJoin, map, Observable, of} from 'rxjs';
import {Project} from './project';
import {User} from '../../user-class/user/user'
import {UserService} from '../../user-class/user/user.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private readonly baseURLp : string = "http://localhost:8080/projects";
  private readonly baseURLt : string = "http://localhost:8080/tasks";
  private readonly baseURLassoc : string = "http://localhost:8080/add";
  private http = inject(HttpClient);

  constructor(private userService : UserService) {
  }

  // obtenir la liste des projets
  public getProjectList() : Observable<Project[]>{
    return this.http.get<Project[]>(`${this.baseURLp}`).pipe(
      catchError(error => {
        console.error('Error fetching projects:', error);
        // Handle the error, e.g., return an empty array or display an error message
        return of([]);
      })
    );
  }

  // creer un projet
  public createProject(project:Project): Observable<Object>{
    return this.http.post<Project>(`${this.baseURLp}`, project);
  }

  // obtenir un projet par son ID
  public getProjectByID(id:string) : Observable<Project>{
    return this.http.get<Project>(`${this.baseURLp}/${id}`);
  }

  //mettre à jour un projet
  public updateProject(project : Project):Observable<any> {
    return this.http.put<Project>(`${this.baseURLp}/${project.project_id}`, project);
  }

  // supprimer un projet
  public deleteProject(id : string ):Observable<Object>{
    return this.http.delete(`${this.baseURLp}/${id}`);
  }

  public saveParticipantsProject(projet_id: string, user_id: string){
    return this.http.post(`${this.baseURLassoc}/${user_id}/${projet_id}`, null);
  }
}
