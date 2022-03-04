import express from 'express'
import cors from 'cors'

import * as apiController from './controllers/api'

const app = express()
app.use(
  cors({
    origin: 'http://localhost:3000',
    methods: 'GET,POST',
    preflightContinue: false,
    optionsSuccessStatus: 204,
  }),
)

app.set('port', process.env.PORT || 3001)

app.get('/api/policies', apiController.policies)
app.get('/api/options', apiController.options)

app.post('/api/policy-add', express.json({ type: '*/*' }), apiController.add)
export default app
