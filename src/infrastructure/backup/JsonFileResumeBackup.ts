import type { ResumeBackup } from '../../application/ports/ResumeBackup'
import type { Resume } from '../../domain/entities/Resume'

export class JsonFileResumeBackup implements ResumeBackup {
  download(resume: Resume, fileBaseName: string): void {
    const json = JSON.stringify(resume, null, 2)
    const url = URL.createObjectURL(new Blob([json], { type: 'application/json' }))
    const link = document.createElement('a')
    link.href = url
    link.download = `${fileBaseName}.json`
    link.click()
    URL.revokeObjectURL(url)
  }

  async read(file: File): Promise<unknown> {
    return JSON.parse(await file.text())
  }
}
