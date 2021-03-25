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

  public user: User
  public users: User[]
  public id: number
  public intro: boolean = true
  public profileCreated: boolean = false;

  constructor(private usersData: UsersService) { }

  @ViewChild('newUserForm') form: any;

  onSubmit(newUserForm: NgForm){
    let item = {
      name: newUserForm.value.name,
      email: newUserForm.value.email,
      phone: newUserForm.value.phone,
      location: newUserForm.value.location
    }

    if(this.form.valid){
      this.usersData.createUser(item)
      this.profileCreated = true
    }else{
      this.profileCreated = false
    }
    
    
  }

  ngOnInit(): void {
 
  }

  closeIntro() {
    this.intro = false
  }

}
