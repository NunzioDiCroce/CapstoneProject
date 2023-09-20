import { Injectable } from '@angular/core';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
import { Platform } from '../models/platform.interface';
import { PlatformCreate } from 'src/app/models/platform-create.interface';
import { PlatformDetails } from 'src/app/models/platform-details.interface';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { map, Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { Resource } from '../models/resource.interface';
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

@Injectable({
  providedIn: 'root'
})
export class PlatformsService {


  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  constructor( private http:HttpClient, private router: Router ) { }


  getPlatforms(page: number, size: number, sortBy: string) {

    const userString = localStorage.getItem('user');
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sortBy', sortBy);
    if (!userString) {
      return this.http.get<any>('http://localhost:3001/platforms', { params });
    }
    const user = JSON.parse(userString);
    const token = user.accessToken;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.get<any>('http://localhost:3001/platforms', { params, headers }).pipe(
      map(response => {
        return {
          content: response.content, // to have current page data
          totalElements: response.totalElements, // to have the total of elements
          totalPages: Math.ceil(response.totalElements / size) // to have the total of pages
        };
      })
    );
    //return this.http.get<any>('http://localhost:3001/platforms', { params, headers }).pipe(map(response => response.content));
    //return this.http.get<Platform[]>('http://localhost:3001/platforms', { headers })
  }


  createPlatform(platform: PlatformCreate): Observable<any> {

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

    return this.http.post<any>('http://localhost:3001/platforms', platform, { headers });
  }


  getPlatformDetails(platformId: string): Observable<any> {

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

    return this.http.get<any>(`http://localhost:3001/platforms/${platformId}`, { headers });
  }


  getResourcesForPlatform(platformId: string): Observable<any>  {

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

    return this.http.get<any>(`http://localhost:3001/platforms/${platformId}/resources`, { headers });
  }


  deletePlatform(platformId: string): Observable<any> {

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

    return this.http.delete<any>(`http://localhost:3001/platforms/${platformId}`, { headers });
  }
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -


}
