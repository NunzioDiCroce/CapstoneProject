import { Component, OnInit } from '@angular/core';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
import { Platform } from 'src/app/models/platform.interface';
import { PlatformsService } from 'src/app/services/platforms.service';
import { AuthData } from 'src/app/auth/auth-data.interface';
import { AuthService } from 'src/app/auth/auth.service';
import { Subscription } from 'rxjs';
//import { Router } from '@angular/router';
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

@Component({
  selector: 'app-platforms',
  templateUrl: './platforms.component.html',
  styleUrls: ['./platforms.component.scss']
})
export class PlatformsComponent implements OnInit {


  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  user!: AuthData | null;
  platforms: Platform[] | undefined;
  sub!: Subscription;

  // pagination
  currentPage = 0;
  pageSize = 1;
  totalItems = 10;
  sortBy = 'id';

  totalPages: number = 1; // Inizializzata a 1
  itemsPerPage: number = 2; // Imposta il numero di elementi per pagina
  pages: number[] = [];

  constructor( private platformsSrv:PlatformsService, private authSrv:AuthService ) { }

  ngOnInit(): void {

    this.authSrv.user$.subscribe((_user) => {
      this.user = _user;
      console.log(this.user)
    });

    this.loadPlatforms(); // pagination

  }

  ngOnDestroy():void {
    if(this.sub) {
      this.sub.unsubscribe()
    }
  }

  // pagination
  loadPlatforms() {
    this.sub = this.platformsSrv.getPlatforms(this.currentPage, this.itemsPerPage, this.sortBy)
    .subscribe((_platforms:Platform[]) => {
      this.platforms = _platforms;
      console.log(this.platforms);

      this.totalPages = Math.ceil(this.platforms.length / this.itemsPerPage);
      this.calculatePages();
    });
    //this.sub = this.platformsSrv.getPlatforms().subscribe((response: any) => {
      //this.platforms = response.content;
      //console.log(this.platforms)
    //});
  }

  calculatePages() {
    this.pages = [];
    for (let i = 1; i <= this.totalPages; i++) {
      this.pages.push(i);
    }
  }

  changePage(page: number) {
    // Cambia la pagina e carica i dati per la nuova pagina
    this.currentPage = page;
    this.loadPlatforms();
  }

  // pagination
  nextPage() {
    if (this.currentPage < Math.ceil(this.totalItems / this.pageSize) - 1) {
      this.currentPage++;
      this.loadPlatforms();
    }
  }

  // pagination
  prevPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.loadPlatforms();
    }
  }
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -


}
