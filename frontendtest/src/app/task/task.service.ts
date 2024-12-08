import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, Observable, of} from 'rxjs';
import {Task} from './task';
import {Project} from '../project-class/project/project';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private readonly baseURL : string = "http://localhost:8080/tasks";
  private http = inject(HttpClient);

  getTaskList() : Observable<Task[]> {
    return this.http.get<Task[]>(`${this.baseURL}`).pipe(
      catchError(error => {
        console.error('Error fetching tasks:', error);
        // Handle the error, e.g., return an empty array or display an error message
        return of([]);
      })
    );
  }
}
