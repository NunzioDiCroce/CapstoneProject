export interface Equipment {

  id: string,
  equipmentType: string,
  equipmentCost: number,
  serialNumber: string,
  equipmentStatus: string,
  // to access 'platformName' property for Resources table
  platform: {
    platformName: string
  }

}
