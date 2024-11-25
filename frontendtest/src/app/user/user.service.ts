import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly baseURL : string = "http://localhost:8080/users";
  private HttpClient: any;
  constructor(private http : HttpClient) { }

  getUserList() : Observable<User[]>{
    return this.HttpClient.get(`${this.baseURL}`);
  }
}
