import type { Resume } from '../../domain/entities/Resume'
import type { ResumeBackup } from '../ports/ResumeBackup'

export class DownloadResumeBackup {
  private readonly backup: ResumeBackup

  constructor(backup: ResumeBackup) {
    this.backup = backup
  }

  execute(resume: Resume): void {
    this.backup.download(resume)
  }
}
