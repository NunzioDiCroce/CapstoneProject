import { Injectable } from '@angular/core';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
import { Equipment } from '../models/equipment.interface';
import { EquipmentCreate } from 'src/app/models/equipment-create.interface';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { map, Observable, of } from 'rxjs';
import { Router } from '@angular/router';
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

@Injectable({
  providedIn: 'root'
})
export class EquipmentsService {


  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  constructor( private http:HttpClient, private router: Router ) { }

  getEquipments(page: number, size: number, sortBy: string) {
    const userString = localStorage.getItem('user');
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sortBy', sortBy);

    if (!userString) {
      return this.http.get<any>('http://localhost:3001/equipments', { params });
    }

    const user = JSON.parse(userString);
    const token = user.accessToken;

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.get<any>('http://localhost:3001/equipments', { params, headers }).pipe(
      map(response => {
        return {
          content: response.content, // to have current page data
          totalElements: response.totalElements, // to have the total of elements
          totalPages: Math.ceil(response.totalElements / size) // to have the total of pages
        };
      })
    );
  }

  createEquipment(equipment: EquipmentCreate): Observable<any> {

    const userString = localStorage.getItem('user');
    if (!userString) {
      this.router.navigate(['/login']);
      return of(null); // to return an empty observable
    }

    const user = JSON.parse(userString);
    const token = user.accessToken;

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.post<any>('http://localhost:3001/equipments', equipment, { headers });
  }
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -


}
