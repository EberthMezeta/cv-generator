import type { Resume } from '../../domain/entities/Resume'

export interface ResumeBackup {
  download(resume: Resume, fileBaseName: string): void
  read(file: File): Promise<unknown>
}
