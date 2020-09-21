import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms'
import { User } from 'src/app/models/user.model';
import { UsersService } from 'src/app/users.service';

@Component({
  selector: 'app-users-form',
  templateUrl: './users-form.component.html',
  styleUrls: ['./users-form.component.scss']
})
export class UsersFormComponent implements OnInit {

  constructor(private usersData: UsersService) { }

  user: User
  users: any
  id: number
  intro: boolean = true
  value: any

  @ViewChild('newUserForm') form: any;

  onSubmit(newUserForm: NgForm){
    this.id = Math.max.apply(Math,this.usersData.store.users.map(obj => obj.id)) + 1
    let item = {
      id: this.id,
      name: newUserForm.value.name,
      email: newUserForm.value.email,
      phone: newUserForm.value.phone,
      location: newUserForm.value.location
    }

    if(this.form.valid){
      this.usersData.createUser(item)
    }
    
    
  }

  ngOnInit(): void {
 
  }

  closeIntro() {
    this.intro = false
  }

}
