import type { Resume } from '../../domain/entities/Resume'
import type { ResumeExporter } from '../ports/ResumeExporter'

export class ExportResumeToPdf {
  private readonly exporter: ResumeExporter

  constructor(exporter: ResumeExporter) {
    this.exporter = exporter
  }

  execute(resume: Resume): Promise<void> {
    return this.exporter.export(resume)
  }
}
