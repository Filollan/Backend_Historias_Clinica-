import { Consultas } from './consultas.js'
import { ConsultasChain } from '../models/modelCadenaConsultas.js'

export class CadenaConsulta {
  constructor(inicio) {
    this.crearPuntoInicio(inicio)
  }

  async crearPuntoInicio(inicio) {
    try {
      const consultas = new Consultas(0, inicio)

      const buscarCadena = await ConsultasChain.findOne({
        hash: consultas.hash,
      }).select('-_id -__v')

      if (buscarCadena) {
        return
      }

      const nuevaCadena = new ConsultasChain(consultas)

      await nuevaCadena.save()

      return
    } catch (error) {
      console.error('Error al crear la consulta:', error)
      throw new Error('Error al crear la cadena')
    }
  }

  async obtenerUltimoConsulta() {
    try {
      const ultimaConsulta = await ConsultasChain.findOne()
        .sort('-index')
        .select('-_id -__v')

      if (!ultimaConsulta) {
        throw new Error('No hay consultas en la cadena')
      }

      return ultimaConsulta
    } catch (error) {
      throw new Error(error.message)
    }
  }

  async createConsulta(dataConsulta) {
    try {

      let prevConsulta = await this.obtenerUltimoConsulta()

      let consulta = new Consultas(
        prevConsulta.index + 1,
        dataConsulta,
        prevConsulta.hash
      )

      let nuevaCadena = new ConsultasChain(consulta)

      const guardado = await nuevaCadena.save()

      if (!guardado) {
        throw new Error('Error al guardar el consulta')
      }

      return { mensaje: 'Consulta creada' }
    } catch (error) {
      throw new Error(error.message)
    }
  }

  async getAllConsultas() {
    const lista = await ConsultasChain.find().select('-_id -__v')

    return lista
  }

  async updateConsulta(diagnosisHash, reason_for_consultation, diagnosis) {
    try {
      const actualizarConsulta = await ConsultasChain.updateOne(
        {
          'hash': diagnosisHash,


        },
        {
          $set: {
            'data.reason_for_consultation': reason_for_consultation,
            'data.diagnosis': diagnosis,
          },
        }
      )

      if (!actualizarConsulta) {
        throw new Error('Error al actualizar el estado de la consulta')
      }

      return { mensaje: 'Consulta actualizada con exito ' + diagnosisHash }
    } catch (error) {
      throw new Error(error.message)
    }
  }

  async deleteConsulta(diagnosisHash) {
    try {
      const deleteConsulta = await ConsultasChain.deleteOne(
        {
          'hash': diagnosisHash,
        },
      )

      if (!deleteConsulta) {
        throw new Error('Consulta no se elimino')
      }

      return { mensaje: 'Consulta eliminada con exito ' + diagnosisHash }
    } catch (error) {
      throw new Error(error.message)
    }
  }
  async findConsulta(hash) {
  
    const consulta = await ConsultasChain.find({ hash: hash }).select('-_id -__v');
  console.log(hash);
    return consulta;
  }
    async verificarIntegridad(hash) {
      try {
        const consulta = await ConsultasChain.findOne({ hash: hash }).select('-_id -__v')
  
        if (!consulta) {
          throw new Error('Consulta no encontrada')
        }
  
        // Verificar el hash de la consulta
        const consultaVerificada = new Consultas(
          consulta.index,
          consulta.data,
          consulta.previousHash
        )
  
        if (consultaVerificada.hash !== consulta.hash) {
          return 'Modificada'
        }
  
        // Verificar la integridad de la cadena
        if (consulta.index > 0) {
          const consultaAnterior = await ConsultasChain.findOne({ index: consulta.index - 1 }).select('-_id -__v')
          if (consulta.previousHash !== consultaAnterior.hash) {
            return false
          }
        }
  
        return 'No modificada'
      } catch (error) {
        throw new Error(error.message)
      }
    }
  
}
