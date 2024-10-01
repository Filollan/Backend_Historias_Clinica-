import crypto from 'crypto'

export class Consultas {
  constructor(index, data, previousHash = '') {
    this.index = index
    this.data = data
    this.previousHash = previousHash
    this.hash = this.createHash()
  }

  createHash() {
    return crypto
      .createHash('sha256')
      .update(this.index + JSON.stringify(this.data) + this.previousHash)
      .digest('hex')
  }
}
