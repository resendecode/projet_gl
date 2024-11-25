import {Component, OnInit} from '@angular/core';
import {User} from '../user/user';
import {NgForOf} from '@angular/common';
import {UserService} from '../user/user.service';

@Component({
  selector: 'app-user-list',
  imports: [
    NgForOf
  ],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css',
  standalone : true
})

export class UserListComponent implements OnInit{

  userService : UserService
  users ?: User[];

  constructor(userService : UserService) {
    this.userService = userService;
  }

  ngOnInit() : void {
    this.getUsers();
  }

  private getUsers() : void{
    //this.userService.getUsersList().subscribe(data =>{
    //  this.users = data;
    //})
    this.users = [new User("001", "skibidi", "toiletdkisi@gmail.com"), new User("002", "mario", "chainemario@gmail.com")];
  }

}
