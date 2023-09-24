import { Component, OnInit } from '@angular/core';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
import { Platform } from 'src/app/models/platform.interface';
import { PlatformsService } from 'src/app/services/platforms.service';
import { AuthData } from 'src/app/auth/auth-data.interface';
import { AuthService } from 'src/app/auth/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
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
  currentPageIndex = 0;
  pageSize = 10;
  sortBy = 'id';
  totalPages = 0;
  totalPagesArray: number[] = [];

  constructor( private platformsSrv:PlatformsService, private authSrv:AuthService, private router: Router ) { }

  ngOnInit(): void {
    this.authSrv.user$.subscribe((_user) => {
      this.user = _user;
      console.log(this.user)
    });
    this.loadPlatforms(); // pagination
  }

  // pagination
  loadPlatforms(): void {
    this.sub = this.platformsSrv.getPlatforms(this.currentPage, this.pageSize, this.sortBy).subscribe((pageData: any) => {
      this.platforms = pageData.content;
      this.totalPages = pageData.totalPages;
      // to create an array with length equal to the total number of available pages (totalPages)
      this.totalPagesArray = Array(this.totalPages).fill(0).map((x, i) => i);
    });
  }

  // pagination
  prevPage(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.currentPageIndex = this.currentPage;
      this.loadPlatforms();
    }
  }

  // pagination
  goToPage(page: number): void {
    if (page >= 0 && page < this.totalPages) {
      this.currentPage = page;
      this.currentPageIndex = page;
      this.loadPlatforms();
    }
  }

  // pagination
  nextPage(): void {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
      this.currentPageIndex = this.currentPage;
      this.loadPlatforms();
    }
  }

  createPlatform(): void {
    this.router.navigate(['/createPlatform']);
  }

  navigateToPlatformDetails(platformId: string): void {
    this.router.navigate(['/platforms', platformId]);
  }

  ngOnDestroy(): void {
    if(this.sub) {
      this.sub.unsubscribe()
    }
  }
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -


}
