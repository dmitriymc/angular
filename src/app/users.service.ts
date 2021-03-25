import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {BehaviorSubject, Observable, Subject, throwError} from 'rxjs'
import { User } from './models/user.model';

@Injectable({
  providedIn: 'root'
})

export class UsersService {

  public _users: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);
  public _user:BehaviorSubject<User> = new BehaviorSubject<User>(null);
  
  constructor(private http: HttpClient) { }

  /* GET USERS */

  loadUserData():void{
    this.http.get<User[]>('http://localhost:3000/users').subscribe(
      data => {
        this._users.next(data);
      },
      error => console.log('error load users data')
    )
  }

  loadUser(id:number):void{
    this.http.get<User>(`http://localhost:3000/users/${id}`).subscribe(
      data => {
        this._user.next(data);
      },
      error => console.log('error load user data')
    )
  }

  /* ADD USER */

  createUser(user: User){
    this.http.post<User>('http://localhost:3000/users', user).subscribe(
      data => {
        this._users.next([...this._users.value, data])
      },
      error => console.log('error create user')  
    )
  }

  /* UPDATE USER */
  
  updateUser(user: User){
    this.http.put<User>(`http://localhost:3000/users/${user.id}`, user).subscribe(
      data => {
        const index = this._users.value.findIndex(profile => profile.id === user.id);
        this._users.next([...this._users.value, this._users.value[index] = data])
      },
      error => console.log('error update user')
    )
  }

  /* DELETE USER */

  removeUser(id: number){
    this.http.delete(`http://localhost:3000/users/${id}`).subscribe(
      data =>{
        this._users.next(this._users.value.filter(user => user.id !== id));
      },
      error => console.log('error remove user')
    )
  }
}

