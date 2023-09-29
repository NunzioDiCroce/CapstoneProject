import { Component, OnInit } from '@angular/core';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
import { Resource } from 'src/app/models/resource.interface';
import { ResourcesService } from 'src/app/services/resources.service';
import { AuthData } from 'src/app/auth/auth-data.interface';
import { AuthService } from 'src/app/auth/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.scss']
})
export class ResourcesComponent implements OnInit {


  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  user!: AuthData | null;
  resources: Resource[] | undefined;
  sub!: Subscription;

  // pagination
  currentPage = 0;
  currentPageIndex = 0;
  pageSize = 10;
  sortBy = 'id';
  totalPages = 0;
  totalPagesArray: number[] = [];

  // table row number
  currentRowNumber: number = 1;

  constructor( private resourcesSrv:ResourcesService, private authSrv:AuthService, private router: Router ) { }

  ngOnInit(): void {
    this.authSrv.user$.subscribe((_user) => {
      this.user = _user;
      console.log(this.user)
    });
    this.loadResources(); // pagination
  }

  // pagination
  loadResources(): void {
    this.sub = this.resourcesSrv.getResources(this.currentPage, this.pageSize, this.sortBy).subscribe((pageData: any) => {
      this.resources = pageData.content;
      this.totalPages = pageData.totalPages;
      this.totalPagesArray = Array(this.totalPages).fill(0).map((x, i) => i);
    });
  }

  // pagination
  prevPage(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.currentPageIndex = this.currentPage;
      this.currentRowNumber = this.currentPage * this.pageSize + 1;
      this.loadResources();
    }
  }

  // pagination
  goToPage(page: number): void {
    if (page >= 0 && page < this.totalPages) {
      this.currentPage = page;
      this.currentPageIndex = page;
      this.currentRowNumber = this.currentPage * this.pageSize + 1;
      this.loadResources();
    }
  }

  // pagination
  nextPage(): void {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
      this.currentPageIndex = this.currentPage;
      this.currentRowNumber = this.currentPage * this.pageSize + 1;
      this.loadResources();
    }
  }

  createResource(): void {
    this.router.navigate(['/createResource']);
  }

  navigateToResourceDetails(resourceId: string): void {
    this.router.navigate(['/resources', resourceId]);
  }

  // to set status color into resources table
  getResourceStatusClass(status: string): string {
    switch (status) {
      case 'AVAILABLE':
        return 'available';
      case 'NOTAVAILABLE':
        return 'notAvailable';
      case 'ASSIGNED':
        return 'assigned';
      default:
        return '';
    }
  }

  // to customize Euro currency format
  euroCurrencyFormat(value: number): string {
    const formattedValue = new Intl.NumberFormat('it-IT', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 2
    }).format(value);
    return formattedValue;
  }

  ngOnDestroy():void {
    if(this.sub) {
      this.sub.unsubscribe()
    }
  }
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -


}
