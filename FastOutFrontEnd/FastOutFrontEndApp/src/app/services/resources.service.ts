import { Injectable } from '@angular/core';

// interface import
import { Resource } from '../models/resource.interface';

// import HttpClient to manage http methods
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ResourcesService {

  constructor( private http:HttpClient ) { } // HttpCLient parameter declaration

  // TODO: custom methods definition

}
