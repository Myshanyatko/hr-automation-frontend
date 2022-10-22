import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


const API = "http://localhost:8080/";
@Injectable({
  providedIn: 'root'
})
export class UsersService {
  

  constructor(private http: HttpClient) { }

  getAPIUsers() {
    
    // this.http.get(API+'users').subscribe({
    this.http.get('https://jsonplaceholder.typicode.com/users')
    .subscribe({
      next: (res: any) => this.setUsers(res),
      error: (err) => alert(err)
        })
  }
  getAPIUser() {
    
    // this.http.get(API+'user').subscribe({
    this.http.get('assets/user.json')
    .subscribe({
      next: (res: any) => this.setUser(res),
      error: (err) => alert(err)
        })
  }
  putAPIUser(user: any){
    this.http.put('assets/user.json', user)
    .subscribe({
      error: (err) => alert(err)
        })
  }
  setUsers(users: any): void{
    
    localStorage.setItem('users', JSON.stringify(users));
  }
  setUser(user: any): void{
    
    localStorage.setItem('user', JSON.stringify(user));
  }
  getUsers(){
    return JSON.parse(localStorage.getItem("users")  || '{}');
  }
  getUser(){
   
    return JSON.parse(localStorage.getItem("user")  || '{}');
  }
}
