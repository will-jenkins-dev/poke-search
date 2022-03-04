export type PetType = { id: number; label: string }
export type InsuranceStatus = { id: number; label: string }

export type Policy = {
  id: number
  name: string
  age: number
  petType: PetType
  insuranceStatus: InsuranceStatus
}

export type PolicyNew = {
  name: string
  age: number
  petTypeId: number
  insuranceStatusId: number
}
