import { Injectable } from '@angular/core';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
import { Resource } from '../models/resource.interface';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs';
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

@Injectable({
  providedIn: 'root'
})
export class ResourcesService {


  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  constructor( private http:HttpClient ) { }

  getResources() {
    const userString = localStorage.getItem('user');

    if (!userString) {
      return this.http.get<Resource[]>('http://localhost:3001/resources');
    }

    const user = JSON.parse(userString);
    const token = user.accessToken;

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.get<any>('http://localhost:3001/resources', { headers }).pipe(map(response => response.content))
  }

}
