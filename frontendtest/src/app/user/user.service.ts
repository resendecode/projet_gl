import {inject, Injectable, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, Observable, of, tap} from 'rxjs';
import {User} from './user';
import {Project} from '../project/project';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly baseURL : string = "http://localhost:8080/users";
  private http = inject(HttpClient);

  getUserList(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseURL}`).pipe(
      catchError(error => {
        console.error('Error fetching users:', error);
        // Handle the error, e.g., return an empty array or display an error message
        return of([]);
      })
    );
  }
}
