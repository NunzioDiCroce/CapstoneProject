import { Component, OnInit } from '@angular/core';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
import { Platform } from 'src/app/models/platform.interface';
import { PlatformCreate } from 'src/app/models/platform-create.interface';
import { PlatformDetails } from 'src/app/models/platform-details.interface';
import { PlatformsService } from 'src/app/services/platforms.service';
import { AuthData } from 'src/app/auth/auth-data.interface';
import { AuthService } from 'src/app/auth/auth.service';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Resource } from 'src/app/models/resource.interface';
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

@Component({
  selector: 'app-platform-details',
  templateUrl: './platform-details.component.html',
  styleUrls: ['./platform-details.component.scss']
})
export class PlatformDetailsComponent implements OnInit {


// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
user!: AuthData | null;
sub!: Subscription;

platformDetails: PlatformDetails | null = null;

resourcesForPlatform: Resource[] = [];

constructor( private platformsSrv:PlatformsService, private authSrv:AuthService, private router: Router, private route: ActivatedRoute ) { }

ngOnInit(): void {
  this.authSrv.user$.subscribe((_user) => {
    this.user = _user;
    console.log(this.user)
  });

  // platformId recovery from the URL
  this.route.paramMap.subscribe((params) => {
    const platformId = params.get('id')!;
    this.loadPlatformDetails(platformId);
  });
}

loadPlatformDetails(platformId: string): void {
  this.sub = this.platformsSrv.getPlatformDetails(platformId).subscribe((details: PlatformDetails) => {
    this.platformDetails = details;
    this.loadResourcesForPlatform(platformId);
  });
}

loadResourcesForPlatform(platformId: string) {
  this.platformsSrv.getResourcesForPlatform(platformId).subscribe(resourcesForPlatform => {
    this.resourcesForPlatform = resourcesForPlatform;
  });
}

deletePlatform(): void {
  if (!this.platformDetails || !this.platformDetails.id) {
    return;
  }
  const platformId = this.platformDetails.id;
  this.platformsSrv.deletePlatform(platformId).subscribe(
    () => {
      this.router.navigate(['/platforms']);
    },
    (error) => {
      console.error('Error deleting platform:', error);
    }
  );
}

navigateBack(): void {
  this.router.navigate(['/platforms']);
}

ngOnDestroy():void {
  if(this.sub) {
    this.sub.unsubscribe()
  }
}
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -


}
