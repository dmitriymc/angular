import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { UsersService } from 'src/app/users.service';
import { faTrashAlt, faWrench } from '@fortawesome/free-solid-svg-icons';
import { NgForm } from '@angular/forms'
import { map } from 'rxjs/operators'
import { User } from '../models/user.model';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  profile: User = null ;
  showForm: boolean = false;
  faTrashAlt = faTrashAlt;
  faWrench = faWrench;
  
  constructor(
    private usersData: UsersService, 
    private route: ActivatedRoute,
    private location: Location) 
  {
    const id: number = +this.route.snapshot.paramMap.get('id');
    this.usersData.loadUser(id)
    this.usersData._user.subscribe(user => {
      this.profile = user;
    })
  }

  @ViewChild('updateUserForm') form: any;

  ngOnInit(): void {    
    
  }

  onSubmit(updateUserForm: NgForm, id: number){
    let item = {
      id: id,
      name: updateUserForm.value.name,
      email: updateUserForm.value.email,
      phone: updateUserForm.value.phone,
      location: updateUserForm.value.location
    }
    if(this.form.valid){
      this.usersData.updateUser(item)
    }
    
  }

  removeProfile(id:number){
    this.usersData.removeUser(id)
    this.location.back()
  }

  formActive():void{
    this.showForm = !this.showForm;
  }

  goBack():void{
    this.location.back()
  }

}
