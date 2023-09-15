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

  constructor( private platformsSrv:PlatformsService, private authSrv:AuthService ) { }

  ngOnInit(): void {

    this.authSrv.user$.subscribe((_user) => {
      this.user = _user;
      console.log(this.user)
    });

    this.sub = this.platformsSrv.getPlatforms().subscribe((_platforms:Platform[]) => {
      this.platforms = _platforms;
      console.log(this.platforms)
    });
    //this.sub = this.platformsSrv.getPlatforms().subscribe((response: any) => {
      //this.platforms = response.content;
      //console.log(this.platforms)
    //});

  }

  ngOnDestroy():void {

    if(this.sub) {
      this.sub.unsubscribe()
    }

  }
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -


}
