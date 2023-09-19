import { Component, OnInit } from '@angular/core';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
import { Resource } from 'src/app/models/resource.interface';
import { ResourceCreate } from 'src/app/models/resource-create.interface';
import { ResourceDetails } from 'src/app/models/resource-details.interface';
import { ResourcesService } from 'src/app/services/resources.service';
import { AuthData } from 'src/app/auth/auth-data.interface';
import { AuthService } from 'src/app/auth/auth.service';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

@Component({
  selector: 'app-resource-details',
  templateUrl: './resource-details.component.html',
  styleUrls: ['./resource-details.component.scss']
})
export class ResourceDetailsComponent implements OnInit {


  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  user!: AuthData | null;
  resources: Resource[] | undefined;
  sub!: Subscription;

  resourceDetails: ResourceDetails | null = null;


  constructor( private resourcesSrv:ResourcesService, private authSrv:AuthService, private router: Router, private route: ActivatedRoute ) { }

  ngOnInit(): void {
    this.authSrv.user$.subscribe((_user) => {
      this.user = _user;
      console.log(this.user)
    });

    // resourceId recovery from the URL
    this.route.paramMap.subscribe((params) => {
      const resourceId = params.get('id')!;
      this.loadResourceDetails(resourceId);
    });
  }

  loadResourceDetails(resourceId: string): void {
    this.sub = this.resourcesSrv.getResourceDetails(resourceId).subscribe((details: ResourceDetails) => {
      this.resourceDetails = details;
    });
  }

  ngOnDestroy():void {
    if(this.sub) {
      this.sub.unsubscribe()
    }
  }
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

}
