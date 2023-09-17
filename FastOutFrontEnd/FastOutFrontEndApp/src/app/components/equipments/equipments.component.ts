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

  // pagination
  currentPage = 0;
  pageSize = 10;
  sortBy = 'id';
  totalPages = 0;
  totalPagesArray: number[] = [];

  constructor( private equipmentsSrv:EquipmentsService, private authSrv:AuthService ) { }

  ngOnInit(): void {
    this.authSrv.user$.subscribe((_user) => {
      this.user = _user;
      console.log(this.user)
    });
    this.loadEquipments(); // pagination
  }

  // pagination
  loadEquipments(): void {
    this.sub = this.equipmentsSrv.getEquipments(this.currentPage, this.pageSize, this.sortBy).subscribe((pageData: any) => {
      this.equipments = pageData.content;
      this.totalPages = pageData.totalPages;
      this.totalPagesArray = Array(this.totalPages).fill(0).map((x, i) => i);
    });
  }

  // pagination
  prevPage(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.loadEquipments();
    }
  }

  // pagination
  goToPage(page: number): void {
    if (page >= 0 && page < this.totalPages) {
      this.currentPage = page;
      this.loadEquipments();
    }
  }

  // pagination
  nextPage(): void {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
      this.loadEquipments();
    }
  }

  ngOnDestroy():void {
    if(this.sub) {
      this.sub.unsubscribe()
    }
  }
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -


}
