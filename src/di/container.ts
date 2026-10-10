import { ExportResume } from '../application/use-cases/ExportResume'
import { GetResume } from '../application/use-cases/GetResume'
import { resume } from '../data/resume'
import { BrowserPrintToPdfExporter } from '../infrastructure/exporters/BrowserPrintToPdfExporter'
import { InMemoryResumeRepository } from '../infrastructure/repositories/InMemoryResumeRepository'

const repository = new InMemoryResumeRepository(resume)
const exporter = new BrowserPrintToPdfExporter()

export const container = {
  getResume: new GetResume(repository),
  exportResume: new ExportResume(exporter),
}

export type Container = typeof container
