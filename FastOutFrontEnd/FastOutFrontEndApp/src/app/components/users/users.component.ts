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

constructor( private usersSrv:UsersService, private authSrv:AuthService ) { }

ngOnInit(): void {

  this.authSrv.user$.subscribe((_user) => {
    this.user = _user;
    console.log(this.user)
  });

  this.sub = this.usersSrv.getUsers().subscribe((_users:User[]) => {
    this.users = _users;
    console.log(this.users)
  });

}

ngOnDestroy():void {

  if(this.sub) {
    this.sub.unsubscribe()
  }

}
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -


}
