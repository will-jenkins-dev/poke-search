import { FormValues } from './types/FormValues'
import { FormFieldSelect } from "./types/FormFieldSelect"
import { FormFieldInput } from "./types/FormFieldInput"
import { FormId } from './types/FormId'

export const FORM_IDS = ['name', 'age', 'petTypeId', 'insuranceStatusId'] as const

const FORM_FIELDS: Record<FormId, FormFieldInput | FormFieldSelect> = {
  name: {
    as: 'input',
    label: `Your Pet's name:`,
    placeholder: 'enter name here',
    initialValue: '',
    validate: (value: string) =>
      !value || value.length === 0 ? 'Pet name is missing' : null,
  },
  age: {
    as: 'input',
    label: `Your Pet's age:`,
    placeholder: 'enter age here',
    initialValue: '',
    type: 'number',
    validate: (value: string) =>
      !value || +value < 0 ? 'Pet age cannot be negative' : null,
  },
  petTypeId: {
    as: 'select',
    label: `Type of pet:`,
    initialValue: -1,
    validate: (value: number) =>
      !value || +value < 0 ? 'Please select a pet type' : null,
    options: [],
  },
  insuranceStatusId: {
    as: 'select',
    label: `Type of cover:`,
    initialValue: -1,
    validate: (value: number) =>
      !value || +value < 0 ? 'Please select an insurance status' : null,
    options: [],
  },
}

const initialValues = Object.fromEntries(
  Object.entries(FORM_FIELDS).map(([k, field]) => [k, field.initialValue]),
) as unknown as FormValues

const intialSelectOption = { id: -1, label: 'Please select...' } as const

export { FORM_FIELDS, initialValues, intialSelectOption }
