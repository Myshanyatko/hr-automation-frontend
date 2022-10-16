import { AuthInterceptor } from './interceptor/auth.interceptor';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router, private http: HttpClient) { }

  
  getToken(){
    const expDate = new Date(localStorage.getItem('expDate') ||  '');
    if(new Date > expDate){
      //рефрешим токен, если протух
      this.http.get('http://localhost:8080/refresh'+localStorage.getItem('refreshToken'), {withCredentials: true}).subscribe(
        (res: any) => this.signIn(res),
        (err) => alert(err)
     )}
    
    return localStorage.getItem('accessToken')
  }

  isLoggedIn(){
    console.log('сначала авторизуйтесь')
    return this.getToken() !== '' 
  }
  
  //функция делающая get запрос после введения почты
  getAPIEmail(email: string){
    localStorage.setItem('email', email)
    // return this.http.get("http://localhost:8080/users?email="+email).subscribe({
    return this.http.get("assets/token.json").subscribe({
      next: () => this.router.navigate(['key']),
      // next: (res: any) => res && this.router.navigate(['key']) || alert('this email is not registered'),
      error: (err) => alert(err.message) 
      // error: (e) => this.router.navigate(['key']) 
    })
   
  }
  //функция делающая get запрос после введения кода 
  getAPIKey(key: string){
    if(localStorage.getItem('email')){
      const email = localStorage.getItem('email');
      // this.http.get(`http://localhost:8080/users/confirm?email=${email}.ru&code=${key}`).subscribe(
      this.http.get(`assets/resKey.json`).subscribe(
      (res: any) => this.signIn(res),
      (err) => alert(err)
   )}
    else alert('нет email')
    
  }
  //когда успешно введен код, выполняется функция
  signIn(data: any){
    this.router.navigate(['']);
    localStorage.setItem('accessToken', data.accessToken); //засэтали временный токен
    localStorage.setItem('refreshToken', data.refreshToken); //засэтали рефреш токен
    const expDate = new Date (new Date().getTime()+ data.expDate); //дата окончания временного токена
    localStorage.setItem('expDate', expDate.toString()) //засэтали время
  }

  logout(){
    
    localStorage.setItem('accessToken', '');
    localStorage.setItem('refreshToken', '');
    localStorage.setItem('expDate', '');
    localStorage.setItem('email', '');
    return this.router.navigate(['login']);
  }
}
