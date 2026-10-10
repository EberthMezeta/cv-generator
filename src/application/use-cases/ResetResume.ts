import type { Resume } from '../../domain/entities/Resume'
import type { ResumeRepository } from '../ports/ResumeRepository'

export class ResetResume {
  private readonly repository: ResumeRepository

  constructor(repository: ResumeRepository) {
    this.repository = repository
  }

  execute(): Promise<Resume> {
    return this.repository.reset()
  }
}
