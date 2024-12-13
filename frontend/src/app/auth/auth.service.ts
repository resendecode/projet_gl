import { Injectable } from '@angular/core';
import {BehaviorSubject, catchError, map, Observable, of} from 'rxjs';
import {User} from '../user-class/user/user';
import {UserService} from '../user-class/user/user.service';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token!: string;
  private userEmail !: string;
  private userPassword !: string;
  private currentUserSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public currentUser$: Observable<any> = this.currentUserSubject.asObservable();

  constructor(private userService : UserService,
              private http: HttpClient,
              private router: Router) {
    // Charger le token existant depuis localStorage au démarrage
    const user = localStorage.getItem('currentUser');
    if (user) {
      this.currentUserSubject.next(JSON.parse(user));
    }
  }


  login(userEmail: string, userPassword: string): Observable<boolean> {
    return this.userService.getUserList().pipe(
      map((users: User[]) => {
        console.log(users);
        const user = users.find(u => u.email === userEmail && u.password === userPassword);
        if (user) {
          // Set the token or other user-related data if required
          this.token = 'someGeneratedToken'; // Replace with real token generation logic
          this.userEmail = user.email;
          this.userPassword = user.password;
          console.log("mail dans login() :", this.userEmail, "password dans login()", this.userPassword)
          return true;
        }
        return false;
      }),
      catchError((error) => {
        // Handle errors from the user service
        console.error('Error during authentication:', error);
        return of(false);
      })
    );
  }

  getToken(): string {
    return this.token;
  }
}
