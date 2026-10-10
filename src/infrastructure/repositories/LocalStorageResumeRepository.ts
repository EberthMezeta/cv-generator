import type { ResumeRepository } from '../../application/ports/ResumeRepository'
import type { Resume } from '../../domain/entities/Resume'
import { isResume } from '../../domain/rules/isResume'

export class LocalStorageResumeRepository implements ResumeRepository {
  private readonly storageKey: string
  private readonly initialResume: Resume

  constructor(storageKey: string, initialResume: Resume) {
    this.storageKey = storageKey
    this.initialResume = initialResume
  }

  async get(): Promise<Resume> {
    return this.readStoredResume() ?? structuredClone(this.initialResume)
  }

  async save(resume: Resume): Promise<void> {
    localStorage.setItem(this.storageKey, JSON.stringify(resume))
  }

  async reset(): Promise<Resume> {
    localStorage.removeItem(this.storageKey)
    return structuredClone(this.initialResume)
  }

  private readStoredResume(): Resume | null {
    try {
      const storedJson = localStorage.getItem(this.storageKey)
      if (!storedJson) return null
      const storedResume: unknown = JSON.parse(storedJson)
      return isResume(storedResume) ? storedResume : null
    } catch {
      return null
    }
  }
}
