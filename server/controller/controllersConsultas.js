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

export const searchConsulta = async (req, res) => {
  const { hash, patient, gynecologist, reason_for_consultation, diagnosis } = req.body;

  try {
    // Creamos un objeto para los criterios de búsqueda
    const searchCriteria = {};

    // Agregar hash si se proporciona
    if (hash) {
      searchCriteria.hash = hash;
    }

    // Agregar criterios de búsqueda por el campo data
    if (patient) {
      searchCriteria['data.patient'] = { $regex: new RegExp(patient, 'i') };  // Búsqueda insensible a mayúsculas/minúsculas
    }
    if (gynecologist) {
      searchCriteria['data.gynecologist'] = { $regex: new RegExp(gynecologist, 'i') };
    }
    if (reason_for_consultation) {
      searchCriteria['data.reason_for_consultation'] = { $regex: new RegExp(reason_for_consultation, 'i') };
    }
    if (diagnosis) {
      searchCriteria['data.diagnosis'] = { $regex: new RegExp(diagnosis, 'i') };
    }

    // Buscar consultas que cumplan con los criterios especificados
    const consultas = await ConsultasChain.find(searchCriteria).select('-_id -__v');

    // Verificar si se encontraron consultas
    if (consultas.length > 0) {
      res.status(200).json(consultas);
    } else {
      res.status(404).json({ mensaje: "No se encontraron consultas que coincidan con los criterios" });
    }
  } catch (error) {
    console.error("Error al buscar consulta:", error);
    res.status(500).json({ error: "Error al realizar la búsqueda" });
  }
};
