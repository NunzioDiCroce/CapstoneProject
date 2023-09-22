export interface Resource {

    id: string,
    resourceType: string,
    resourceCost: number,
    hoursPerMonth: number,
    resourceStatus: string,
    platform: {
      platformName: string
    }

}
