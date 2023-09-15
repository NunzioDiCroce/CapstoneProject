import { Component, OnInit } from '@angular/core';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
import { Resource } from 'src/app/models/resource.interface';
import { ResourcesService } from 'src/app/services/resources.service';
import { AuthData } from 'src/app/auth/auth-data.interface';
import { AuthService } from 'src/app/auth/auth.service';
import { Subscription } from 'rxjs';
//import { Router } from '@angular/router';
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

  constructor( private resourcesSrv:ResourcesService, private authSrv:AuthService ) { }

  ngOnInit(): void {

    this.authSrv.user$.subscribe((_user) => {
      this.user = _user;
      console.log(this.user)
    });

    this.sub = this.resourcesSrv.getResources().subscribe((_resources:Resource[]) => {
      this.resources = _resources;
      console.log(this.resources)
    });

  }

  ngOnDestroy():void {

    if(this.sub) {
      this.sub.unsubscribe()
    }

  }
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -


}
