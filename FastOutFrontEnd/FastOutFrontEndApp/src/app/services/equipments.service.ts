import { Injectable } from '@angular/core';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
import { Equipment } from '../models/equipment.interface';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs';
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

@Injectable({
  providedIn: 'root'
})
export class EquipmentsService {


  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  constructor( private http:HttpClient ) { }

  getEquipments() {
    const userString = localStorage.getItem('user');

    if (!userString) {
      return this.http.get<Equipment[]>('http://localhost:3001/equipments');
    }

    const user = JSON.parse(userString);
    const token = user.accessToken;

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.get<any>('http://localhost:3001/equipments', { headers }).pipe(map(response => response.content))
  }
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -


}
