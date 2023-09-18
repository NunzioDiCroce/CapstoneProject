export interface Platform {

  // interface properties definition
  id: number,

  platformName: string,
  location: string,

  customerType: string,

  parcelsPerMonth: number,
  parcelRate: number,
  revenuesPerMonth: number,

  totalCostsPerMonth: number,
  hoursPerMonth: number,

  marginPerMonth: number,
  productivity: number

  //resources: arrayList
  //equipments: arrayList

}
