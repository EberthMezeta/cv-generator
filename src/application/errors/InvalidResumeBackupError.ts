export class InvalidResumeBackupError extends Error {
  constructor() {
    super('El archivo no contiene un CV válido')
    this.name = 'InvalidResumeBackupError'
  }
}
