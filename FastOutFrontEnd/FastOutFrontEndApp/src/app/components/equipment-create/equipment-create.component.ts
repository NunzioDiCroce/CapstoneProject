import { Component, OnInit } from '@angular/core';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
import { Equipment } from 'src/app/models/equipment.interface';
import { EquipmentCreate } from 'src/app/models/equipment-create.interface';
import { EquipmentsService } from 'src/app/services/equipments.service';
import { AuthData } from 'src/app/auth/auth-data.interface';
import { AuthService } from 'src/app/auth/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

@Component({
  selector: 'app-equipment-create',
  templateUrl: './equipment-create.component.html',
  styleUrls: ['./equipment-create.component.scss']
})
export class EquipmentCreateComponent implements OnInit {


  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  user!: AuthData | null;
  equipments: Equipment[] | undefined;
  sub!: Subscription;

  equipment: EquipmentCreate = {
    equipmentType: '',
    equipmentCost: 0.0,
    serialNumber: '',
    equipmentStatus: ''
  };

  // to have resourceCost based on resourceType dynamically in the form
  equipmentCosts: { [key: string]: number } = {
    BARCODEREADER: 1000,
    FORKLIFT: 3000,
    SAFETYDEVICES: 2000
  }

  constructor( private equipmentsSrv:EquipmentsService, private authSrv:AuthService, private router: Router ) { }

  ngOnInit(): void {
    this.authSrv.user$.subscribe((_user) => {
      this.user = _user;
      console.log(this.user)
    });
  }

  // to have equipmentCost based on equipmentType dynamically in the form
  onEquipmentTypeChange(): void {
    const selectedEquipmentType = this.equipment.equipmentType;
    this.equipment.equipmentCost = this.equipmentCosts[selectedEquipmentType] || 0;
  }

  onSubmit(form:NgForm): void {
    this.equipmentsSrv.createEquipment(this.equipment).subscribe(() => {
      alert('Equipment creation success!');
      this.router.navigate(['/equipments']);
    });
  }

  cancelCreation(): void {
    alert('Equipment creation cancelled!');
    this.router.navigate(['/equipments']);
  }


}
