import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {BehaviorSubject, Observable, Subject, throwError} from 'rxjs'
import { User } from './models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private _users = new BehaviorSubject<User[]>([]);
  private store: {users: User[]} = {users:[]};
  public id;
  readonly users = this._users.asObservable();
  
  constructor(private http: HttpClient) { }

  /* GET USERS */

  loadUserData():void{
    this.http.get<User[]>('http://localhost:3000/users').subscribe(
      data => {
        this.store.users = data;
        this._users.next(Object.assign({}, this.store).users);
        this.id = Math.max.apply(Math,this.store.users.map(obj => obj.id))
      },
      error => console.log('error load users data')
    )
  }

  loadUser(id:number):void{
    this.http.get<User>(`http://localhost:3000/users/${id}`).subscribe(
      data => {
        let nf = true
        this.store.users.forEach((item,index) => {
          if(item.id === data.id){
            this.store.users[index] = data;
            nf = false
          } 
        });
        if(nf){
          this.store.users.push(data)
        }
        this._users.next(Object.assign({},this.store).users)
      },
      error => console.log('error load user data')
    )
  }

  /* ADD USER */

  createUser(user: User){
    this.http.post<User>('http://localhost:3000/users', user).subscribe(
      data => {
        this.store.users.push(user),
        this._users.next(Object.assign({},this.store).users)
      },
      error => console.log('error create user')  
    )
  }

  /* UPDATE USER */
  
  updateUser(user: User){
    this.http.put<User>(`http://localhost:3000/users/${user.id}`, user).subscribe(
      data => {
        this.store.users.forEach((u,index) => {
          if(u.id === data.id){
            this.store.users[index] = data
          }
        })
        this._users.next(Object.assign({},this.store).users)
      },
      error => console.log('error update user')
    )
  }

  /* DELETE USER */

  removeUser(id: number){
    this.http.delete(`http://localhost:3000/users/${id}`).subscribe(
      data =>{
        this.store.users.forEach((r,index) =>{
          if(r.id === id){
            this.store.users.splice(index,1)
          }
        })
        this._users.next(Object.assign({},this.store).users)
      },
      error => console.log('error remove user')
    )
  }
}

