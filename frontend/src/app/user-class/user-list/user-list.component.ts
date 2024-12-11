import {Component, OnInit} from '@angular/core';
import {User} from '../user/user';
import {NgForOf, NgIf} from '@angular/common';
import {UserService} from '../user/user.service';

@Component({
  selector: 'app-user-list',
  imports: [
    NgForOf,
    NgIf
  ],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css',
  standalone : true
})

export class UserListComponent implements OnInit{

  users : User[] = [];

  constructor( private userService: UserService) {
  }

  ngOnInit() : void {
    this.getUsers();
  }

  private getUsers() : void{
    this.userService.getUserList()
      .subscribe(users => {
        this.users = users;
      }, error => {
        console.error('Error fetching users:', error);
        // Handle the error, e.g., display an error message to the user
      });
  }

}
