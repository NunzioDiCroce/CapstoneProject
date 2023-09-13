import { Injectable } from '@angular/core';

// interface import
import { Equipment } from '../models/equipment.interface';

// import HttpClient to manage http methods
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EquipmentsService {

  constructor( private http:HttpClient ) { } // HttpCLient parameter declaration

  // TODO: custom methods definition

}
