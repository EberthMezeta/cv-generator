import type { ResumeTemplate } from '../ResumeTemplate'
import { ClassicDocument } from './ClassicDocument'

export const classicTemplate: ResumeTemplate = {
  id: 'classic',
  name: 'Clásica',
  Document: ClassicDocument,
}
