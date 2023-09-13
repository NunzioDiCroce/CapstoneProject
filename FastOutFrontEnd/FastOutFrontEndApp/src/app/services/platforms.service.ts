import { Injectable } from '@angular/core';

// interface import
import { Platform } from '../models/platform.interface';

// import HttpClient to manage http methods
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PlatformsService {

  constructor( private http:HttpClient ) { } // HttpCLient parameter declaration

  // TODO: custom methods definition

}
