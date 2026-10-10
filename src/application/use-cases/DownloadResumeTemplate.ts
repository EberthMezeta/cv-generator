import type { Resume } from '../../domain/entities/Resume'
import type { ResumeBackup } from '../ports/ResumeBackup'

const TEMPLATE_FILE_NAME = 'plantilla-cv'

export class DownloadResumeTemplate {
  private readonly backup: ResumeBackup
  private readonly templateResume: Resume

  constructor(backup: ResumeBackup, templateResume: Resume) {
    this.backup = backup
    this.templateResume = templateResume
  }

  execute(): void {
    this.backup.download(this.templateResume, TEMPLATE_FILE_NAME)
  }
}
