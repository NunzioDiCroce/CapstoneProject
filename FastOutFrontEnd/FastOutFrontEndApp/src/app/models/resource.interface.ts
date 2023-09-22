export interface Resource {

    id: string,
    resourceType: string,
    resourceCost: number,
    hoursPerMonth: number,
    resourceStatus: string,
    // to access 'platformName' property for Resources table
    platform: {
      platformName: string
    }

}
