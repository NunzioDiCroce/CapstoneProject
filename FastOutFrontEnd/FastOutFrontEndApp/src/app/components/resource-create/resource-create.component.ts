import { Component, OnInit } from '@angular/core';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
import { Resource } from 'src/app/models/resource.interface';
import { ResourceCreate } from 'src/app/models/resource-create.interface';
import { ResourcesService } from 'src/app/services/resources.service';
import { AuthData } from 'src/app/auth/auth-data.interface';
import { AuthService } from 'src/app/auth/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

@Component({
  selector: 'app-resource-create',
  templateUrl: './resource-create.component.html',
  styleUrls: ['./resource-create.component.scss']
})
export class ResourceCreateComponent implements OnInit {


  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  user!: AuthData | null;
  resources: Resource[] | undefined;
  sub!: Subscription;

  resource: ResourceCreate = {
    resourceType: '',
    resourceCost: 0.0,
    hoursPerMonth: 168, // AS-IS default value
    resourceStatus: ''
  };

  // to have resourceCost based on resourceType dynamically in the form
  resourceCosts: { [key: string]: number } = {
    SITEMANAGER: 3800,
    FORKLIFTDRIVER: 3500,
    PICKER: 3000,
    CONTROLLER: 2800,
    OPERATOR: 2600
  }

  constructor( private resourcesSrv: ResourcesService, private authSrv: AuthService, private router: Router ) { }

  ngOnInit(): void {
    this.authSrv.user$.subscribe((_user) => {
      this.user = _user;
      console.log(this.user)
    });
  }

  // to have resourceCost based on resourceType dynamically in the form
  onResourceTypeChange(): void {
    const selectedResourceType = this.resource.resourceType;
    this.resource.resourceCost = this.resourceCosts[selectedResourceType] || 0;
  }

  onSubmit(form:NgForm): void {
    this.resourcesSrv.createResource(this.resource).subscribe(() => {
      window.alert('Resource creation success!');
      this.router.navigate(['/resources']);
    });
  }

  cancelCreation(): void {
    const confirmation = window.confirm('Are you sure you want to cancel the current operation?');
    if (confirmation) {
      this.router.navigate(['/resources']);
    }
  }

  ngOnDestroy():void {
    if(this.sub) {
      this.sub.unsubscribe()
    }
  }
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -


}
