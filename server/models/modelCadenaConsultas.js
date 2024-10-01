import { Schema, model } from 'mongoose'

const schemaConsultas = new Schema({
  index: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
    required: true,
  },
  data: {

    patient: {
      type: String,
    },
    gynecologist: {
      type: String,
    },
    reason_for_consultation: {
      type: String,
    },

    diagnosis: {
      type: String,
    },

  },
  previousHash: {
    type: String,
    default: '',
  },
  hash: {
    type: String,
    required: true,
  },
})

export const ConsultasChain = model('cons', schemaConsultas)
