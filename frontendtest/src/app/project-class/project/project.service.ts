import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of, catchError} from 'rxjs';
import {Project} from './project';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private readonly baseURL : string = "http://localhost:8080/projects";
  private http = inject(HttpClient);

  public getProjectList() : Observable<Project[]>{
    return this.http.get<Project[]>(`${this.baseURL}`).pipe(
      catchError(error => {
        console.error('Error fetching projects:', error);
        // Handle the error, e.g., return an empty array or display an error message
        return of([]);
      })
    );
  }

  public createProject(project:Project): Observable<Object>{
    return this.http.post(`${this.baseURL}`, project);
  }

  public getProjectByID(id:string) : Observable<Project>{
    return this.http.get<Project>(`${this.baseURL}/${id}`);
  }

  public updateProject(id: string, project : Project):Observable<Object> {
    return this.http.put(`${this.baseURL}/${id}`, project);
  }
}
