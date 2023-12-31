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
import { Platform } from 'src/app/models/platform.interface';
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

  availablePlatforms: Platform[] = [];
  selectedPlatformId: string | null = null;
  assigningResource: boolean = false;

  dataLoaded = false; // boolean to track data loading for loadAvailablePlatforms

  constructor( private resourcesSrv: ResourcesService, private authSrv: AuthService, private router: Router, private route: ActivatedRoute ) { }

  ngOnInit(): void {
    this.authSrv.user$.subscribe((_user) => {
      this.user = _user;
      console.log(this.user)
    });

    // resourceId recovery from the URL
    this.route.paramMap.subscribe((params) => {
      const resourceId = params.get('id')!;
      this.loadResourceDetails(resourceId);
      this.loadAvailablePlatforms();
      console.log(this.availablePlatforms);
    });
  }

  loadResourceDetails(resourceId: string): void {
    this.sub = this.resourcesSrv.getResourceDetails(resourceId).subscribe((details: ResourceDetails) => {
      this.resourceDetails = details;
    });
  }

  changeResourceStatus(newStatus: string): void {
    if (!this.resourceDetails) {
      return;
    }
    const resourceId = this.resourceDetails.id;
    if ((this.resourceDetails.resourceStatus === 'AVAILABLE' && newStatus === 'NOTAVAILABLE') ||
        (this.resourceDetails.resourceStatus === 'NOTAVAILABLE' && newStatus === 'AVAILABLE')) {
      this.resourcesSrv.changeResourceStatus(resourceId, newStatus).subscribe(
        (updatedResource: ResourceDetails) => {
          this.resourceDetails = updatedResource;
        },
        (error) => {
          console.error('Error changing resource state:', error);
        }
      );
    }
  }

  loadAvailablePlatforms(): void {
    this.resourcesSrv.getAvailablePlatforms().subscribe((platforms: Platform[] ) => {
      console.log(platforms);
      if (platforms) {
        this.availablePlatforms = platforms;
        this.dataLoaded = true; // boolean to track data loading for loadAvailablePlatforms
      }
      console.log(this.dataLoaded);
      console.log(typeof platforms);
      //console.log(typeof platforms.content);
    });
  }

  assignResourceToPlatform(): void {
    if (this.resourceDetails && this.resourceDetails.id && this.selectedPlatformId && !this.assigningResource) {
      this.assigningResource = true;
      const assignPayload = {
        resourceStatus: 'ASSIGNED',
        platformId: this.selectedPlatformId
      };

      this.resourcesSrv.assignResource(this.resourceDetails.id, assignPayload).subscribe((result: any) => {
        this.assigningResource = false;
        if (result) {
          this.loadAvailablePlatforms();
          window.alert('Successful resource allocation!');
          this.router.navigate(['/resources']);
        }
      });
    }
  }

  removeResourceFromPlatform(): void {
    if (this.resourceDetails && this.resourceDetails.id && !this.assigningResource) {
      this.assigningResource = true;
      const removePayload = {
        resourceStatus: 'AVAILABLE'
      };

      this.resourcesSrv.removeResource(this.resourceDetails.id, removePayload).subscribe((result: any) => {
        this.assigningResource = false;
        if (result) {
          this.loadAvailablePlatforms();
          window.alert('Successful platform removal!');
          this.router.navigate(['/resources']);
        }
      });
    }
  }

  deleteResource(): void {
    if (!this.resourceDetails || !this.resourceDetails.id) {
      return;
    }
    const resourceId = this.resourceDetails.id;
    const confirmation = window.confirm('Are you sure you want to delete the resource?');
    if (confirmation) {
      this.resourcesSrv.deleteResource(resourceId).subscribe(
        () => {
          alert('Resource deleted!');
          this.router.navigate(['/resources']);
        },
        (error) => {
          console.error('Error deleting resource:', error);
        }
      );
    }
  }

  navigateBack(): void {
    this.router.navigate(['/resources']);
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

  ngOnDestroy(): void {
    if(this.sub) {
      this.sub.unsubscribe()
    }
  }
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -


}
