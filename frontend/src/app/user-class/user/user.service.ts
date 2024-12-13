import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, Observable, of, tap} from 'rxjs';
import {User} from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly baseURL : string = "http://localhost:8080/users";
  private readonly baseURLassoc : string = "http://localhost:8080/add";
  private http = inject(HttpClient);

  // get tous les utilisateurs
  getUserList(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseURL}`).pipe(
      tap(users => console.log("Données brutes reçues :", users)),
      catchError(error => {
        console.error('Error fetching users:', error);
        return of([]);
      })
    );
  }

  // créer un utilsateur (créer un compte)
  public createUser(user:User): Observable<Object>{
    return this.http.post<User>(this.baseURL, user);
  }

  // obtenir un utilisateur par son ID
  public getUserByID(id:string) : Observable<User>{
    return this.http.get<User>(`${this.baseURL}/${id}`);
  }

  // todo : mettre a jour un utilisateur (maj profil)
  public updateUser(id: string, user : User):Observable<Object> {
    return this.http.put(`${this.baseURL}/${id}`, user);
  }

  // todo : supprimer un utilisateur (supprimer son compte)
  public deleteUser(id : string ):Observable<Object>{
    return this.http.delete(`${this.baseURL}/${id}`);
  }
}
