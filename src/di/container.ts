import { DownloadResumeBackup } from '../application/use-cases/DownloadResumeBackup'
import { ExportResumeToPdf } from '../application/use-cases/ExportResumeToPdf'
import { GetResume } from '../application/use-cases/GetResume'
import { PreparePhoto } from '../application/use-cases/PreparePhoto'
import { ResetResume } from '../application/use-cases/ResetResume'
import { RestoreResumeBackup } from '../application/use-cases/RestoreResumeBackup'
import { SaveResume } from '../application/use-cases/SaveResume'
import { initialResume } from '../data/initialResume'
import { JsonFileResumeBackup } from '../infrastructure/backup/JsonFileResumeBackup'
import { BrowserPrintToPdfExporter } from '../infrastructure/exporters/BrowserPrintToPdfExporter'
import { CanvasPhotoProcessor } from '../infrastructure/images/CanvasPhotoProcessor'
import { LocalStorageResumeRepository } from '../infrastructure/repositories/LocalStorageResumeRepository'

const RESUME_STORAGE_KEY = 'cv-generator:resume'

const repository = new LocalStorageResumeRepository(RESUME_STORAGE_KEY, initialResume)
const backup = new JsonFileResumeBackup()

export const container = {
  getResume: new GetResume(repository),
  saveResume: new SaveResume(repository),
  resetResume: new ResetResume(repository),
  exportResumeToPdf: new ExportResumeToPdf(new BrowserPrintToPdfExporter()),
  downloadResumeBackup: new DownloadResumeBackup(backup),
  restoreResumeBackup: new RestoreResumeBackup(backup, repository),
  preparePhoto: new PreparePhoto(new CanvasPhotoProcessor()),
}

export type Container = typeof container
