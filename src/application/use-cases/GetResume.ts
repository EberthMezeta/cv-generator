import type { Resume } from '../../domain/entities/Resume'
import { validateResume, type ValidationIssue } from '../../domain/rules/validateResume'
import type { ResumeRepository } from '../ports/ResumeRepository'

export interface GetResumeResult {
  resume: Resume
  issues: ValidationIssue[]
}

export class GetResume {
  private readonly repository: ResumeRepository

  constructor(repository: ResumeRepository) {
    this.repository = repository
  }

  async execute(): Promise<GetResumeResult> {
    const resume = await this.repository.get()
    return { resume, issues: validateResume(resume) }
  }
}
