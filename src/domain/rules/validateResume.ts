import type { DateRange, Resume } from '../entities/Resume'

export interface ValidationIssue {
  path: string
  message: string
}

const YEAR_MONTH = /^\d{4}-(0[1-9]|1[0-2])$/

function validatePeriod(period: DateRange, path: string): ValidationIssue[] {
  const issues: ValidationIssue[] = []
  if (!YEAR_MONTH.test(period.start)) {
    issues.push({ path: `${path}.start`, message: `Fecha inválida "${period.start}", usa YYYY-MM` })
  }
  if (period.end !== 'present') {
    if (!YEAR_MONTH.test(period.end)) {
      issues.push({ path: `${path}.end`, message: `Fecha inválida "${period.end}", usa YYYY-MM` })
    } else if (period.end < period.start) {
      issues.push({ path, message: 'La fecha de fin es anterior a la de inicio' })
    }
  }
  return issues
}

export function validateResume(resume: Resume): ValidationIssue[] {
  const issues: ValidationIssue[] = []

  if (!resume.personal.fullName.trim()) {
    issues.push({ path: 'personal.fullName', message: 'El nombre es obligatorio' })
  }

  resume.education.forEach((e, i) => issues.push(...validatePeriod(e.period, `education[${i}].period`)))
  resume.experience.forEach((e, i) => issues.push(...validatePeriod(e.period, `experience[${i}].period`)))

  return issues
}
