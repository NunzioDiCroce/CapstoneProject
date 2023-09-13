import { Injectable } from '@angular/core';

// interface import
import { User } from '../models/user.interface';

// import HttpClient to manage http methods
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor( private http:HttpClient ) { } // HttpCLient parameter declaration

  // TODO: custom methods definition

}
