import { Injectable } from '@angular/core';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
import { User } from '../models/user.interface';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs';
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

@Injectable({
  providedIn: 'root'
})
export class UsersService {


  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  constructor( private http:HttpClient ) { }

  getUsers() {
    const userString = localStorage.getItem('user');

    if (!userString) {
      return this.http.get<User[]>('http://localhost:3001/users');
    }

    const user = JSON.parse(userString);
    const token = user.accessToken;

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.get<any>('http://localhost:3001/users', { headers }).pipe(map(response => response.content))
  }
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -


}
