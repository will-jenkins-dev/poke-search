import { FORM_FIELDS } from './form.constants'
import { FormId } from './types/FormId'
import { Field, FormikProps } from 'formik'
import { InsuranceStatus, PetType } from '../common/types/Policy'
import { FormValues } from './types/FormValues'

import './PolicyFormField.css'

type PetFormFieldProps = {
  id: FormId
  options?: (PetType | InsuranceStatus)[]
}
export const PetFormField: React.FC<
  PetFormFieldProps & FormikProps<FormValues>
> = props => {
  const { id, options, errors, touched } = props
  const { label, initialValue, ...restFieldProps } = FORM_FIELDS[id]
  const children = options
    ? {
        children: options.map(({ id, label }: PetType | InsuranceStatus) => (
          <option key={id} value={id} label={label}>
            {label}
          </option>
        )),
      }
    : undefined
  return (
    <>
      <div className="policy-form-field">
        <label htmlFor={id}>{label}</label>
        <Field id={id} name={id} {...restFieldProps} {...children} />
      </div>
      {errors[id] && touched[id] ? (
        <div className="form-error">{errors[id]}</div>
      ) : null}
    </>
  )
}
