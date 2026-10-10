import { classicTemplate } from './classic/classicTemplate'
import { jakeTemplate } from './jake/jakeTemplate'
import type { ResumeTemplate } from './ResumeTemplate'

export const templateCatalog: readonly ResumeTemplate[] = [jakeTemplate, classicTemplate]

export const defaultTemplate = jakeTemplate

export function findTemplate(templateId: string): ResumeTemplate {
  return templateCatalog.find((template) => template.id === templateId) ?? defaultTemplate
}
