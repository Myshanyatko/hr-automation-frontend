import { TokenService } from './token.service';
import { AuthInterceptor } from '../interceptors/auth.interceptor';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';


const AUTH_API = "http://localhost:8080/";
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})



export class AuthService {

  constructor(private router: Router, private http: HttpClient, private tokenService: TokenService) { }

  
  
  //функция делающая get запрос после введения почты
  getAPIEmail(email: string){
    window.sessionStorage.removeItem('email');
    window.sessionStorage.setItem('email', email)
    //разкомментить, когда подключишь сервер
    // return this.http.get(AUTH_API+'authorization?email='+email).subscribe({
    return this.http.get("assets/token.json").subscribe({
      next: () => this.router.navigate(['key']),
      error: (err) => alert(err.message)
    })
   
  }
  //функция делающая get запрос после введения кода 
  getAPIKey(key: string){
    if(window.sessionStorage.getItem('email')){
      const email = window.sessionStorage.getItem('email');
       //разкомментить, когда подключишь сервер
      // this.http.get(AUTH_API+`/authorization/confirm?email=${{email}}&code=${{key}}`).subscribe(
      this.http.get(`assets/resKey.json`).subscribe({
        next: (res: any) => this.signIn(res),
        error: (err) => alert(err)
    }
   )}
    else alert('нет email')
    
  }
  //когда успешно введен код, выполняется функция
  signIn(data: any){
    this.router.navigate(['']); //переход в основное приложение
    this.tokenService.setAccessToken(data.accessToken);//засэтали временный токен
    this.tokenService.setRefreshToken(data.refreshToken); //засэтали рефреш токен
    this.tokenService.setAuthUser(data.authUser); //засэтали данные пользователя
  }

//выход из аккаунта
  logout(){
    window.sessionStorage.clear()
    return this.router.navigate(['login']);
  }
  refreshToken(token: string) {
    return this.http.post(AUTH_API + 'refresh', {
      refreshToken: token
    }, httpOptions);
  }

}