import { useState, useEffect } from 'react'
import { Formik, Form, FormikProps } from 'formik'

import * as api from '../api/api'

import { FormValues } from './types/FormValues'
import { PetFormField } from './PolicyFormField'
import { intialSelectOption, initialValues } from './form.constants'
import { InsuranceStatus, PetType } from '../common/types/Policy'

import './FormAddPolicy.css'

type AddPolicyFormProps = {
  onAdd: () => void
}

type PolicyNew = {
  name: string
  age: number
  petTypeId: number
  insuranceStatusId: number
}
const formatPolicyFormValues = (values: FormValues): PolicyNew => {
  const {
    petTypeId: petTypeIdString,
    insuranceStatusId: insuranceStatusIdString,
    ...rest
  } = values
  return {
    ...rest,
    petTypeId: +petTypeIdString,
    insuranceStatusId: +insuranceStatusIdString,
  }
}

const AddPolicyForm: React.FC<AddPolicyFormProps> = props => {
  const [statuses, setStatuses] = useState<Array<InsuranceStatus>>([])
  const [petTypes, setPetTypes] = useState<Array<PetType>>([])
  const { onAdd } = props
  useEffect(() => {
    api.getOptions().then(({ insuranceStatuses = [], petTypes = [] }) => {
      setStatuses([{ ...intialSelectOption }, ...insuranceStatuses])
      setPetTypes([{ ...intialSelectOption }, ...petTypes])
    })
  }, [])
  const submitValues = async ({
    values,
  }: {
    values: FormValues
  }): Promise<boolean> => {
    const policy: PolicyNew = formatPolicyFormValues(values)
    return await api.addPolicy(policy)
  }

  return (
    <div className="policy-form-container">
      <h2>Add a new Policy</h2>
      <Formik<FormValues>
        initialValues={initialValues}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          const success = await submitValues({ values })
          setSubmitting(false)
          onAdd && onAdd()
          success && resetForm()
        }}
      >
        {(formikProps: FormikProps<FormValues>) => (
          <Form>
            <PetFormField id={'name'} {...formikProps} />
            <PetFormField id={'age'} {...formikProps} />
            <PetFormField
              id={'petTypeId'}
              options={petTypes}
              {...formikProps}
            />
            <PetFormField
              id={'insuranceStatusId'}
              options={statuses}
              {...formikProps}
            />
            <button type="submit">Submit</button>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export { AddPolicyForm }
