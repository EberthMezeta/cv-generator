import type { Resume } from '../../domain/entities/Resume'

export interface ResumeRepository {
  get(): Promise<Resume>
}
