import type { Resume } from '../../domain/entities/Resume'
import { isResume } from '../../domain/rules/isResume'
import { InvalidResumeBackupError } from '../errors/InvalidResumeBackupError'
import type { ResumeBackup } from '../ports/ResumeBackup'
import type { ResumeRepository } from '../ports/ResumeRepository'

export class RestoreResumeBackup {
  private readonly backup: ResumeBackup
  private readonly repository: ResumeRepository

  constructor(backup: ResumeBackup, repository: ResumeRepository) {
    this.backup = backup
    this.repository = repository
  }

  async execute(file: File): Promise<Resume> {
    const content = await this.backup.read(file)
    if (!isResume(content)) throw new InvalidResumeBackupError()
    await this.repository.save(content)
    return content
  }
}
