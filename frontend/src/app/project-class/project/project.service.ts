import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, Observable, of} from 'rxjs';
import {Project} from './project';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private readonly baseURLp : string = "http://localhost:8080/projects";
  private readonly baseURLt : string = "http://localhost:8080/tasks";
  private http = inject(HttpClient);

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

}
