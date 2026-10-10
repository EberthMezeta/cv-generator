import { resumeFileName } from '../../application/formatters/fileName'
import type { ResumeExporter } from '../../application/ports/ResumeExporter'
import type { Resume } from '../../domain/entities/Resume'

export class BrowserPrintToPdfExporter implements ResumeExporter {
  async export(resume: Resume): Promise<void> {
    const previousTitle = document.title
    document.title = resumeFileName(resume.personal.fullName)
    window.addEventListener('afterprint', () => (document.title = previousTitle), { once: true })
    window.print()
  }
}
