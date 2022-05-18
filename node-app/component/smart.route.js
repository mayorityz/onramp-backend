import express from 'express'
import { deployment, Mint } from './smart.controller.js'

const Router = express.Router()

Router.get('/deploy', deployment)
Router.post('/mint', Mint)

export default Router
