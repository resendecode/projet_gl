import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  imports: [
    FormsModule
  ],
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  usermail !: string;
  password !: string;

  constructor(private auth: AuthService,
              private router: Router) { }

  ngOnInit(): void {
  }

  onLogin() {
    console.log("mail :", this.usermail, "password :", this.password);
    this.auth.login(this.usermail, this.password).subscribe({
      next: (isAuthenticated) => {
        if (isAuthenticated) {
          console.log("connecté");
          this.router.navigateByUrl('/projects');
        } else {
          console.log("erreur connexion");
        }
      },
      error: (error) => {
        console.error("Erreur d'authentification :", error);
      }
    });
  }

}
