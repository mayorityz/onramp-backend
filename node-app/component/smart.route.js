import express from 'express'
import { GetBalance, OnRamp } from './smart.controller.js'

const Router = express.Router()

Router.post('/getBalance', GetBalance)
Router.post('/mint', OnRamp)

export default Router
