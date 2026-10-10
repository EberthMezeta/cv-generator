import type { DateRange, Resume } from '../entities/Resume'
import { isYearMonth } from './yearMonth'

export interface ValidationIssue {
  field: string
  message: string
}

function validatePeriod(period: DateRange, field: string): ValidationIssue[] {
  if (!isYearMonth(period.start)) {
    return [{ field, message: 'Falta la fecha de inicio' }]
  }
  if (period.end === 'present') return []
  if (!isYearMonth(period.end)) {
    return [{ field, message: 'Falta la fecha de fin o marca "Actualidad"' }]
  }
  if (period.end < period.start) {
    return [{ field, message: 'La fecha de fin es anterior a la de inicio' }]
  }
  return []
}

export function validateResume(resume: Resume): ValidationIssue[] {
  const nameIssues: ValidationIssue[] = resume.personal.fullName.trim()
    ? []
    : [{ field: 'Datos personales', message: 'El nombre es obligatorio' }]

  const educationIssues = resume.education.flatMap((education, index) =>
    validatePeriod(education.period, `Educación ${index + 1}`),
  )
  const experienceIssues = resume.experience.flatMap((experience, index) =>
    validatePeriod(experience.period, `Experiencia ${index + 1}`),
  )

  return [...nameIssues, ...educationIssues, ...experienceIssues]
}
