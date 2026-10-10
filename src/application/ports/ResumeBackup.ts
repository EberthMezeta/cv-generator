import type { Resume } from '../../domain/entities/Resume'

export interface ResumeBackup {
  download(resume: Resume): void
  read(file: File): Promise<unknown>
}
