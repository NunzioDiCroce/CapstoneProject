import { Component, OnInit } from '@angular/core';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
import { Equipment } from 'src/app/models/equipment.interface';
import { EquipmentsService } from 'src/app/services/equipments.service';
import { AuthData } from 'src/app/auth/auth-data.interface';
import { AuthService } from 'src/app/auth/auth.service';
import { Subscription } from 'rxjs';
//import { Router } from '@angular/router';
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

@Component({
  selector: 'app-equipments',
  templateUrl: './equipments.component.html',
  styleUrls: ['./equipments.component.scss']
})
export class EquipmentsComponent implements OnInit {


  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  user!: AuthData | null;
  equipments: Equipment[] | undefined;
  sub!: Subscription;

  constructor( private equipmentsSrv:EquipmentsService, private authSrv:AuthService ) { }

  ngOnInit(): void {

    this.authSrv.user$.subscribe((_user) => {
      this.user = _user;
      console.log(this.user)
    });

    this.sub = this.equipmentsSrv.getEquipments().subscribe((_equipments:Equipment[]) => {
      this.equipments = _equipments;
      console.log(this.equipments)
    });

  }

  ngOnDestroy():void {

    if(this.sub) {
      this.sub.unsubscribe()
    }

  }
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -


}
