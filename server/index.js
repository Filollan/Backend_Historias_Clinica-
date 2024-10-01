import express from 'express'
import cors from 'cors'

import { connectDB } from './config/db.js'

import { routerConsultas } from './routes/routerConsultas.js'

const server = express()

server.use(express.json())
server.use(cors())

connectDB()

server.use('/consultations', routerConsultas)

server.listen(3000, () => {
  console.log('http://localhost:3000')
})
