import type { Resume } from '../../domain/entities/Resume'
import type { ResumeRepository } from '../ports/ResumeRepository'

export class SaveResume {
  private readonly repository: ResumeRepository

  constructor(repository: ResumeRepository) {
    this.repository = repository
  }

  execute(resume: Resume): Promise<void> {
    return this.repository.save(resume)
  }
}
