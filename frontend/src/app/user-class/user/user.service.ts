import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, Observable, of} from 'rxjs';
import {User} from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly baseURL : string = "http://localhost:8080/users";
  private readonly baseURLassoc : string = "http://localhost:8080/project_participants";
  private http = inject(HttpClient);

  // get tout les utilisateurs
  getUserList(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseURL}`).pipe(
      catchError(error => {
        console.error('Error fetching users:', error);
        // Handle the error, e.g., return an empty array or display an error message
        return of([]);
      })
    );
  }

  // todo : créer un utilsateur (créer un compte)
  public createUser(user:User): Observable<Object>{
    return this.http.post<User>(this.baseURL, user);
  }

  // obtenir un utilisateur par son ID
  public getUserByID(id:string) : Observable<User>{
    return this.http.get<User>(`${this.baseURL}/${id}`);
  }

  // todo : obtenir les utilisateurs pour chaque projets
  public getUsersByProjectID(id:string) : Observable<User[]>{
    return this.http.get<User[]>(`${this.baseURLassoc}?project_id=${id}`);
  }

  // todo : mettre a jour un utilisteur (maj profil)
  public updateUser(id: string, user : User):Observable<Object> {
    return this.http.put(`${this.baseURL}/${id}`, user);
  }


  // todo : supprimer un utilisateur (supprimer son compte)
  public deleteUser(id : string ):Observable<Object>{
    return this.http.delete(`${this.baseURL}/${id}`);
  }}
