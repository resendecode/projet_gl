import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {User} from '../user/user';
import {UserService} from '../user/user.service';
import {FormsModule} from '@angular/forms';
import {find, Observable} from 'rxjs';
import {UserRole} from '../user/UserRole';
import {Project} from '../../project-class/project/project';
import { Task } from '../../task-class/task/task';

@Component({
  selector: 'app-create-user',
  imports: [
    FormsModule
  ],
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.css'
})
export class CreateUserComponent implements OnInit{
  user : User = new User();

  constructor(private userService : UserService,
              private router : Router) {
  }

  ngOnInit():void {
  }

  onSubmit(){
    if (!this.checkCreateSubmit()){
      console.log("utilisateur crée", this.user);
      this.saveUser();
      this.goToProjectList();
    } else {
      console.log("Utilisateur existe déjà avec ce nom")
    }

  }

  // todo : verifier si l'utilisateur n'existe pas déjà
  checkCreateSubmit() : boolean{
    let usersTemp : Observable<User[]> = this.userService.getUserList();
    let rep : boolean = false;
    usersTemp.subscribe(
      us => us.forEach(u => {
        return u.name != this.user.name ? rep = false : rep = true;
      })
    );
    console.log(rep);
    return rep;
  }

  toPayload(): any {
    return {
      user_id: this.user.user_id,
      name: this.user.name,
      email: this.user.email,
      password: this.user.password,
      role: this.user.role,
      projects: [], // Toujours vide
      tasks: []     // Toujours vide
    };
  }

  // todo : sauvegarder l'utilisateur crée (pb mdp null)
  saveUser() {
    const userPayload = this.toPayload();

    this.userService.createUser(userPayload).subscribe(
      data => {
        console.log("Utilisateur créé avec succès :", data);
        this.goToProjectList();
      },
      error => {
        console.error("Erreur lors de la création de l'utilisateur :", error);
      }
    );
  }


  goToProjectList(){
    this.router.navigate(['/projects']);
    window.location.reload();
  }
}
