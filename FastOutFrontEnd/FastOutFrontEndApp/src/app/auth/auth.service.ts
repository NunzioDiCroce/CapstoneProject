import { Injectable } from '@angular/core';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, throwError } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { tap } from 'rxjs';
import { AuthData } from './auth-data.interface';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  jwtHelper = new JwtHelperService();
  baseURL = environment.baseURL;
  private authSubj = new BehaviorSubject<null | AuthData>(null);
  utente!: AuthData;

  user$ = this.authSubj.asObservable();
  timeoutLogout: any;

  constructor( private http:HttpClient, private router:Router ) { }

  login(data: { email:string; password:string }) {
    return this.http.post<AuthData>(`${this.baseURL}login`, data).pipe(tap((data) => {
      console.log(data);
      this.authSubj.next(data);
      this.utente = data;
      console.log(this.utente);
      localStorage.setItem('user', JSON.stringify(data));
      this.autoLogout(data)
    }))
  }

  restore() {
    const user = localStorage.getItem('user');
    if(!user) {
      return
    }
    const userData: AuthData = JSON.parse(user);
    if(this.jwtHelper.isTokenExpired(userData.accessToken)) {
      return
    }
    this.authSubj.next(userData);
    this.autoLogout(userData)
  }

  signup(data: { name: string; surname: string; email:string; password:string }) {
    return this.http.post(`${this.baseURL}auth/register`, data);
  }

  logout() {
    this.authSubj.next(null);
    localStorage.removeItem('user');
    this.router.navigate(['/']);
    if(this.timeoutLogout) {
      clearTimeout(this.timeoutLogout)
    }
  }

  autoLogout(data:AuthData) {
    const expirationDate = this.jwtHelper.getTokenExpirationDate(data.accessToken) as Date;
    const expirationMilliseconds = expirationDate.getTime() - new Date().getTime();
    this.timeoutLogout = setTimeout(() => {this.logout()}, expirationMilliseconds)
  }

  private errors(err:any) {
    switch(err.error) {
      case 'Email already exists':
        return throwError('Email already exists')
        break
      case 'Email format is invalid':
        return throwError('Email format is invalid')
        break
      default:
         return throwError('Call error')
         break
    }
  }
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -


}
