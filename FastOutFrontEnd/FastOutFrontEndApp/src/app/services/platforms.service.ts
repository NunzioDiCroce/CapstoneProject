import { Injectable } from '@angular/core';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
import { Platform } from '../models/platform.interface';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs';
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

@Injectable({
  providedIn: 'root'
})
export class PlatformsService {


  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  constructor( private http:HttpClient ) { }

  getPlatforms() {
    const userString = localStorage.getItem('user');

    if (!userString) {
      return this.http.get<Platform[]>('http://localhost:3001/platforms');
    }

    const user = JSON.parse(userString);
    const token = user.accessToken;

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.get<any>('http://localhost:3001/platforms', { headers }).pipe(map(response => response.content))

  }

}
