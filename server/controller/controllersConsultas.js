import { CadenaConsulta } from '../blockchain/cadenaConsulta.js'

let cadenaConsulta = new CadenaConsulta('Genesis')

export const getAllConsultas = async (req, res) => {
  try {
    const consultas = await cadenaConsulta.getAllConsultas()

    res.status(201).json( consultas )
  } catch (error) {
    res.status(400).json(error.message)
  }
}

export const createConsulta = async (req, res) => {
  const consulta = req.body

  try {
    const {  mensaje } = await cadenaConsulta.createConsulta(consulta)

    res.status(201).json( mensaje )
  } catch (error) {
    res.status(400).json(error.message)
  }
}


export const updateConsulta = async (req, res) => {
  const { diagnosisHash, reason_for_consultation, diagnosis } = req.params

  try {
    const { mensaje } = await cadenaConsulta.updateConsulta(
      diagnosisHash,
      reason_for_consultation,
      diagnosis
    )

    res.status(201).json(mensaje)
  } catch (error) {
    res.status(400).json(error.message)
  }
}

export const deleteConsulta = async (req, res) => {
  const { diagnosisHash } = req.params

  try {
    const { mensaje } = await cadenaConsulta.deleteConsulta(
      diagnosisHash,
      
    )

    res.status(201).json(mensaje)
  } catch (error) {
    res.status(400).json(error.message)
  }
}
export const findConsulta = async (req, res) => {
  try {
    const consultas = await cadenaConsulta.getAllConsultas()

    res.status(201).json( consultas )
  } catch (error) {
    res.status(400).json(error.message)
  }

}
export const verificarIntegridad = async (req, res) => {
  const { hash } = req.params
  try {
    const esIntegro = await cadenaConsulta.verificarIntegridad(hash)
    res.status(200).json({ esIntegro })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}