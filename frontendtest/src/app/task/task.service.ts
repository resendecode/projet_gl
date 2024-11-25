import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Task} from './task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private readonly baseURL : string = "http://localhost:8080/tasks";
  private HttpClient: any;
  constructor(private http : HttpClient) { }

  getTaskList() : Observable<Task[]>{
    return this.HttpClient.get(`${this.baseURL}`);
  }
}
