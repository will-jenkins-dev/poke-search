import { Response, Request } from 'express'
import Ajv, { JTDDataType } from 'ajv/dist/jtd'

import * as repo from './../data/repository'

import { PolicyNew } from '../types/policy.type'

const ajv = new Ajv()

const schema = {
  properties: {
    name: { type: 'string' },
    age: { type: 'int32' },
    petTypeId: { type: 'int32' },
    insuranceStatusId: { type: 'int32' },
  },
} as const

type NewPolicySchema = JTDDataType<typeof schema>
const validate = ajv.compile<NewPolicySchema>(schema)

export const policies = (req: Request, res: Response): void => {
  const currentPolicies = repo.getPolicies()
  res.json({ policies: currentPolicies })
}

export const options = (req: Request, res: Response): void => {
  const options = repo.getOptions()
  res.json(options)
}

export const add = (
  req: Request<unknown, unknown, PolicyNew>,
  res: Response,
): void => {
  const policyNew = req.body
  if (validate(policyNew)) {
    repo.addPolicy(policyNew)
    res.sendStatus(200)
  } else {
    res.send(400)
  }
}
