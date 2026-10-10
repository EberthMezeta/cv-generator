import type { Resume } from '../entities/Resume'

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

const LIST_FIELDS = ['sections', 'education', 'skills', 'experience', 'certifications'] as const

export function isResume(value: unknown): value is Resume {
  if (!isRecord(value) || !isRecord(value.personal)) return false
  const hasValidLocale = value.locale === 'es' || value.locale === 'en'
  const hasValidPersonal = typeof value.personal.fullName === 'string' && Array.isArray(value.personal.contacts)
  const hasValidLists = LIST_FIELDS.every((field) => Array.isArray(value[field]))
  return hasValidLocale && hasValidPersonal && hasValidLists
}
