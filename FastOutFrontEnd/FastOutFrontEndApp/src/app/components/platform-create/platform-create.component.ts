import { Component, OnInit } from '@angular/core';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
import { Platform } from 'src/app/models/platform.interface';
import { PlatformCreate } from 'src/app/models/platform-create.interface';
import { PlatformsService } from 'src/app/services/platforms.service';
import { AuthData } from 'src/app/auth/auth-data.interface';
import { AuthService } from 'src/app/auth/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

@Component({
  selector: 'app-platform-create',
  templateUrl: './platform-create.component.html',
  styleUrls: ['./platform-create.component.scss']
})
export class PlatformCreateComponent implements OnInit {


  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  user!: AuthData | null;
  platforms: Platform[] | undefined;
  sub!: Subscription;

  platform: PlatformCreate = {
    platformName: '',
    location: '',
    customerType: '',
    parcelsPerMonth: 0,
    parcelRate: 0.0,
  };

  constructor( private platformsSrv:PlatformsService, private authSrv:AuthService, private router: Router ) { }

  ngOnInit(): void {
    this.authSrv.user$.subscribe((_user) => {
      this.user = _user;
      console.log(this.user)
    });
  }

  onSubmit(form:NgForm): void {
    this.platformsSrv.createPlatform(this.platform).subscribe(() => {
      alert('Platform creation success!');
      this.router.navigate(['/platforms']);
    });
  }

  cancelCreation(): void {
    alert('Platform creation cancelled!');
    this.router.navigate(['/platforms']);
  }

}
