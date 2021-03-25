import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UsersService } from 'src/app/users.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {

  public users: User[] = [];

  constructor(private usersData: UsersService) {
    usersData.loadUserData();
    usersData._users.subscribe(users => {
      this.users = users;
    })
  }

  ngOnInit(): void {
    
  }

}