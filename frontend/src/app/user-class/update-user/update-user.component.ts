import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../user/user';
import {UserService} from '../user/user.service';

@Component({
  selector: 'app-update-user',
  imports: [],
  templateUrl: './update-user.component.html',
  styleUrl: './update-user.component.css'
})
export class UpdateUserComponent implements OnInit{
  user : User = new User();
  id : string = '';

  constructor(private userService : UserService,
              private route : ActivatedRoute,
              private router : Router) {
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.userService.getUserByID(this.id).subscribe(data => {
      this.user = data;
    }, error => console.log(error));
  }

  onSubmit() {
    this.userService.updateUser(this.id, this.user).subscribe(data => {
      this.goToProjectList();
    }, error => console.log(error));
  }

  goToProjectList(){
    this.router.navigate(['/projects']);
  }
}
