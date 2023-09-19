import { Injectable } from '@angular/core';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
import { Resource } from '../models/resource.interface';
import { ResourceCreate } from 'src/app/models/resource-create.interface';
import { ResourceDetails } from 'src/app/models/resource-details.interface'
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { map, Observable, of } from 'rxjs';
import { Router } from '@angular/router';
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

@Injectable({
  providedIn: 'root'
})
export class ResourcesService {


  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  constructor( private http:HttpClient, private router: Router ) { }


  getResources(page: number, size: number, sortBy: string) {

    const userString = localStorage.getItem('user');
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sortBy', sortBy);
    if (!userString) {
      return this.http.get<any>('http://localhost:3001/resources', { params });
    }
    const user = JSON.parse(userString);
    const token = user.accessToken;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.get<any>('http://localhost:3001/resources', { params, headers }).pipe(
      map(response => {
        return {
          content: response.content, // to have current page data
          totalElements: response.totalElements, // to have the total of elements
          totalPages: Math.ceil(response.totalElements / size) // to have the total of pages
        };
      })
    );
  }


  createResource(resource: ResourceCreate): Observable<any> {

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

    return this.http.post<any>('http://localhost:3001/resources', resource, { headers });
  }


  getResourceDetails(resourceId: string): Observable<any> {

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

    return this.http.get<any>(`http://localhost:3001/resources/${resourceId}`, { headers });
  }


  changeResourceStatus(resourceId: string, newStatus: string): Observable<any> {

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

    const body = {
      resourceStatus: newStatus
    };

    return this.http.put<any>(`http://localhost:3001/resources/${resourceId}`, body, { headers });
  }


  getAvailablePlatforms(): Observable<any> {

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

    return this.http.get<any>('http://localhost:3001/platforms', { headers });
  }


  assignResource(resourceId: string, payload: any): Observable<any> {

    const userString = localStorage.getItem('user');
    if (!userString) {
      this.router.navigate(['/login']);
      return of(null);
    }
    const user = JSON.parse(userString);
    const token = user.accessToken;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.put<any>(`http://localhost:3001/resources/${resourceId}/assign`, payload, { headers });
  }


  removeResource(resourceId: string, payload: any): Observable<any> {

    const userString = localStorage.getItem('user');
    if (!userString) {
      this.router.navigate(['/login']);
      return of(null);
    }
    const user = JSON.parse(userString);
    const token = user.accessToken;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.put<any>(`http://localhost:3001/resources/${resourceId}/remove`, payload, { headers });
  }


  deleteResource(resourceId: string): Observable<any> {

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

    return this.http.delete<any>(`http://localhost:3001/resources/${resourceId}`, { headers });
  }
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -


}
