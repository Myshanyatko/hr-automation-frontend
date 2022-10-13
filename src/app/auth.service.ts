import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router, private http: HttpClient) { }

  //сюда токен (а что потом с ним делать?)
  setToken(token: string){
    localStorage.setItem('token', token)
  }

  getToken() {
    return localStorage.getItem('token')
  }

  isLoggedIn(){
    console.log('token= '+this.getToken())
    return this.getToken() !== null;
  }

  //функция делающая get запрос после введения почты
  getEmail(email: string){
    return this.http.get("http://localhost:8080/users?email="+email).subscribe({
      next: (res: any) => res && this.router.navigate(['key']) || alert('this email is not registered'),
      error: (err) => alert(err.message) 
      // error: (e) => this.router.navigate(['key']) 
    })
   
  }
  //функция делающая get запрос после введения кода 
  getKey(key: string){
     this.http.get('assets/token.json').subscribe(
      (data: any) => {if (data.token != null){this.signIn(data.token) } else alert('неправильный код')}
   )
  }
  //когда успешно введен код, выполняется функция
  signIn(token: string){
    this.router.navigate(['']);
    this.setToken(token)
  }
}
