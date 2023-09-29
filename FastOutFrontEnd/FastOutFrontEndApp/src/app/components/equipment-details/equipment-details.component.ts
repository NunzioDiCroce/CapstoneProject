import { Component, OnInit } from '@angular/core';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
import { Equipment } from 'src/app/models/equipment.interface';
import { EquipmentCreate } from 'src/app/models/equipment-create.interface';
import { EquipmentDetails } from 'src/app/models/equipment-details.interface';
import { EquipmentsService } from 'src/app/services/equipments.service';
import { AuthData } from 'src/app/auth/auth-data.interface';
import { AuthService } from 'src/app/auth/auth.service';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Platform } from 'src/app/models/platform.interface';
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

@Component({
  selector: 'app-equipment-details',
  templateUrl: './equipment-details.component.html',
  styleUrls: ['./equipment-details.component.scss']
})
export class EquipmentDetailsComponent implements OnInit {


  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  user!: AuthData | null;
  equipments: Equipment[] | undefined;
  sub!: Subscription;

  equipmentDetails: EquipmentDetails | null = null;

  availablePlatforms: Platform[] = [];
  selectedPlatformId: string | null = null;
  assigningEquipment: boolean = false;

  dataLoaded = false; // boolean to track data loading for loadAvailablePlatforms

  constructor( private equipmentsSrv: EquipmentsService, private authSrv: AuthService, private router: Router, private route: ActivatedRoute ) { }

  ngOnInit(): void {
    this.authSrv.user$.subscribe((_user) => {
      this.user = _user;
      console.log(this.user)
    });

    // equipmentId recovery from the URL
    this.route.paramMap.subscribe((params) => {
      const equipmentId = params.get('id')!;
      this.loadEquipmentDetails(equipmentId);
      this.loadAvailablePlatforms();
      console.log(this.availablePlatforms);
    });
  }

  loadEquipmentDetails(equipmentId: string): void {
    this.sub = this.equipmentsSrv.getEquipmentDetails(equipmentId).subscribe((details: EquipmentDetails) => {
      this.equipmentDetails = details;
    });
  }

  changeEquipmentStatus(newStatus: string): void {
    if (!this.equipmentDetails) {
      return;
    }
    const equipmentId = this.equipmentDetails.id;
    if ((this.equipmentDetails.equipmentStatus === 'AVAILABLE' && newStatus === 'NOTAVAILABLE') ||
        (this.equipmentDetails.equipmentStatus === 'NOTAVAILABLE' && newStatus === 'AVAILABLE')) {
      this.equipmentsSrv.changeEquipmentStatus(equipmentId, newStatus).subscribe(
        (updatedEquipment: EquipmentDetails) => {
          this.equipmentDetails = updatedEquipment;
        },
        (error) => {
          console.error('Error changing equipment state:', error);
        }
      );
    }
  }

  loadAvailablePlatforms(): void {
    this.equipmentsSrv.getAvailablePlatforms().subscribe((platforms: Platform[] ) => {
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

  assignEquipmentToPlatform(): void {
    if (this.equipmentDetails && this.equipmentDetails.id && this.selectedPlatformId && !this.assigningEquipment) {
      this.assigningEquipment = true;
      const assignPayload = {
        equipmentStatus: 'ASSIGNED',
        platformId: this.selectedPlatformId
      };

      this.equipmentsSrv.assignEquipment(this.equipmentDetails.id, assignPayload).subscribe((result: any) => {
        this.assigningEquipment = false;
        if (result) {
          this.loadAvailablePlatforms();
          window.alert('Successful equipment allocation!');
          this.router.navigate(['/equipments']);
        }
      });
    }
  }

  removeEquipmentFromPlatform(): void {
    if (this.equipmentDetails && this.equipmentDetails.id && !this.assigningEquipment) {
      this.assigningEquipment = true;
      const removePayload = {
        equipmentStatus: 'AVAILABLE'
      };

      this.equipmentsSrv.removeEquipment(this.equipmentDetails.id, removePayload).subscribe((result: any) => {
        this.assigningEquipment = false;
        if (result) {
          this.loadAvailablePlatforms();
          window.alert('Successful platform removal!');
          this.router.navigate(['/equipments']);
        }
      });
    }
  }

  deleteEquipment(): void {
    if (!this.equipmentDetails || !this.equipmentDetails.id) {
      return;
    }
    const equipmentId = this.equipmentDetails.id;
    const confirmation = window.confirm('Are you sure you want to delete the equipment?');
    if (confirmation) {
      this.equipmentsSrv.deleteEquipment(equipmentId).subscribe(
        () => {
          alert('Equipment deleted!');
          this.router.navigate(['/equipments']);
        },
        (error) => {
          console.error('Error deleting equipment:', error);
        }
      );
    }
  }

  navigateBack(): void {
    this.router.navigate(['/equipments']);
  }

  // to set status color into resources table
  getEquipmentStatusClass(status: string): string {
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
