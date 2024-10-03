import { Router } from 'express'

import {
  createConsulta,
  getAllConsultas,
  updateConsulta,
  deleteConsulta,
  findConsulta,
  verificarIntegridad,
} from '../controller/controllersConsultas.js'

export const routerConsultas = Router()

//obtener las consultas
routerConsultas.get('/', getAllConsultas)
//crear las consultas

routerConsultas.post('/', createConsulta)

//actualizar las consultas
routerConsultas.put('/:diagnosisHash/:reason_for_consultation/:diagnosis', updateConsulta)

// eliminar las consultas
routerConsultas.delete('/:diagnosisHash', deleteConsulta)


//encontrar consulta por consulta
routerConsultas.get('/:diagnosisHash', findConsulta)

//verificar si la consulta a sido modificada                
routerConsultas.get('/verificar/:hash', verificarIntegridad)

