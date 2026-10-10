import type { ResumeRepository } from '../../application/ports/ResumeRepository'
import type { Resume } from '../../domain/entities/Resume'

export class InMemoryResumeRepository implements ResumeRepository {
  private readonly resume: Resume

  constructor(resume: Resume) {
    this.resume = resume
  }

  async get(): Promise<Resume> {
    return structuredClone(this.resume)
  }
}
