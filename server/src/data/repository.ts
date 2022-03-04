import {
  PetType,
  InsuranceStatus,
  Policy,
  PolicyNew,
} from './../types/policy.type'

export const petTypes: Array<PetType> = [
  { id: 1, label: 'Cat' },
  { id: 2, label: 'Dog' },
  { id: 3, label: 'Lizard' },
  { id: 4, label: 'Other' },
]

export const insuranceStatuses: Array<InsuranceStatus> = [
  { id: 1, label: 'Fully Covered' },
  { id: 2, label: 'Accident Only' },
  { id: 3, label: 'No Cover' },
]

export type PolicyOptions = {
  petTypes: Array<PetType>
  insuranceStatuses: Array<InsuranceStatus>
}

const getPetType = (id: number) => petTypes.find((pt: PetType) => pt.id === +id)
const getPetTypes = (): Array<PetType> => petTypes

const getInsuranceStatuses = (): Array<InsuranceStatus> => insuranceStatuses
const getInsuranceStatus = (id: number) =>
  insuranceStatuses.find((is: InsuranceStatus) => is.id === +id)

const getOptions = (): PolicyOptions => ({
  petTypes: getPetTypes(),
  insuranceStatuses: getInsuranceStatuses(),
})
const policies: Record<number, Policy> = {}
const getPolicies = (): Array<Policy> => Object.values(policies)

const addPolicy = (policyNew: PolicyNew): void => {
  const { name, age, petTypeId, insuranceStatusId } = policyNew

  const petType = getPetType(petTypeId)
  const insuranceStatus = getInsuranceStatus(insuranceStatusId)

  const indexes = Object.keys(policies).map(i => +i)
  const nextIndex: number = Math.max(...[0, ...indexes]) + 1
  if (!petType || !insuranceStatus) {
    throw Error('Invalid payload - unknown petType or insuranceStatus')
  }
  const policyToAdd: Policy = {
    id: nextIndex,
    name,
    age,
    petType,
    insuranceStatus,
  }
  policies[nextIndex] = policyToAdd
}
export { addPolicy, getPolicies, getOptions }
