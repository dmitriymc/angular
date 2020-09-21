import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/users.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {

  constructor(private usersData: UsersService) { }

  users:any

  ngOnInit(): void {
    
    this.users = this.usersData.users
    this.usersData.loadUserData()

  }

}