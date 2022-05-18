import express from 'express'
import cors from 'cors'

const app = express()
const PORT = process.env.PORT || 8084
const ROUTE_PATH = '/api/v1'

import DeploymentRoute from './node-app/component/smart.route.js'

app.use(cors())
app.use(express.json({ limit: '50mb' }))
app.use(
  express.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }),
)

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', '*')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  next()
})

app.use(`${ROUTE_PATH}/smart-contract`, DeploymentRoute)

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})

try {
  app.listen(PORT, () => {
    console.log('connecting DB ...')
    console.log(`running on port ${PORT}`)
  })
} catch (error) {
  console.log(error.message)
  res.status(500).send(error.message)
}
