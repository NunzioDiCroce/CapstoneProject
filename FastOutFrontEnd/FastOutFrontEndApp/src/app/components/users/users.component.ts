import { Component, OnInit } from '@angular/core';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
import { User } from 'src/app/models/user.interface';
import { UsersService } from 'src/app/services/users.service';
import { AuthData } from 'src/app/auth/auth-data.interface';
import { AuthService } from 'src/app/auth/auth.service';
import { Subscription } from 'rxjs';
//import { Router } from '@angular/router';
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {


  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  user!: AuthData | null;
  users: User[] | undefined;
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

  constructor( private usersSrv:UsersService, private authSrv:AuthService ) { }

  ngOnInit(): void {
    this.authSrv.user$.subscribe((_user) => {
      this.user = _user;
      console.log(this.user)
    });
    this.loadUsers(); // pagination
  }

  // pagination
  loadUsers(): void {
    this.sub = this.usersSrv.getUsers(this.currentPage, this.pageSize, this.sortBy).subscribe((pageData: any) => {
      this.users = pageData.content;
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
      this.loadUsers();
    }
  }

  // pagination
  goToPage(page: number): void {
    if (page >= 0 && page < this.totalPages) {
      this.currentPage = page;
      this.currentPageIndex = page;
      this.currentRowNumber = this.currentPage * this.pageSize + 1;
      this.loadUsers();
    }
  }

  // pagination
  nextPage(): void {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
      this.currentPageIndex = this.currentPage;
      this.currentRowNumber = this.currentPage * this.pageSize + 1;
      this.loadUsers();
    }
  }

  ngOnDestroy():void {
    if(this.sub) {
      this.sub.unsubscribe()
    }
  }
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -


}
