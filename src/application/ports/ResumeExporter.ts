import type { Resume } from '../../domain/entities/Resume'

export interface ResumeExporter {
  export(resume: Resume): Promise<void>
}
