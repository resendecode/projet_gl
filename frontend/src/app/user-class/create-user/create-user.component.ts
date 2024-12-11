import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {User} from '../user/user';
import {UserService} from '../user/user.service';
import {FormsModule} from '@angular/forms';
import {find, Observable} from 'rxjs';

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

  constructor(private userService : UserService, private router : Router) {
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

  // verifier si l'utilisateur n'existe pas déjà
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

  // todo : sauvegarder l'utilisateur crée (probleme sur le createUser ? tout est null dans la BD)
  saveUser(){
    this.userService.createUser(this.user).subscribe(data =>{
        console.log(data);
        this.goToProjectList();
      },
      error => console.log(error)
    );
  }

  goToProjectList(){
    this.router.navigate(['/projects']);
  }
}
