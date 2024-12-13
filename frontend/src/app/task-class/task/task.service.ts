import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, Observable, of, tap, throwError} from 'rxjs';
import {Task} from './task';
import {Project} from '../../project-class/project/project';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private readonly baseURL : string = "http://localhost:8080/tasks";
  private http = inject(HttpClient);

  //obtenir toutes les taches
  getTaskList() : Observable<Task[]> {
    return this.http.get<Task[]>(`${this.baseURL}`).pipe(
      catchError(error => {
        console.error('Error fetching tasks:', error);
        // Handle the error, e.g., return an empty array or display an error message
        return of([]);
      })
    );
  }

  // todo : créer une tâche (marche pas pour l'instant on sait pas pourquoi)
  public createTask(task:Task): Observable<any>{
    console.log("tache envoyé à la BD", task);
    return this.http.post<any>(`${this.baseURL}`, task).pipe(
      catchError((error) => {
        console.error("Erreur dans createTask :", error);
        return of({ success: false, message: "Échec de la création de la tâche" });
      })
    );
  }

  // obtenir une tâche par son id
  public getTaskByID(id:string) : Observable<Task>{
    return this.http.get<Task>(`${this.baseURL}/${id}`);
  }

  // obtenir les tâches d'un projet
  public getTasksByProjectId(projectId: string): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.baseURL}?projectId=${projectId}`);
  }

  // todo : mettre à jour une tâche
  public updateTask(id: string, task : Task):Observable<Object> {
    return this.http.put(`${this.baseURL}/${id}`, task);
  }

  // todo : supprimer une tâche
  public deleteTask(id : string ):Observable<Object>{
    return this.http.delete(`${this.baseURL}/${id}`);
  }

}
