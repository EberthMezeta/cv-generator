import type {
  Certification,
  ContactItem,
  DateRange,
  Education,
  Experience,
  Highlight,
  SkillCategory,
} from '../entities/Resume'
import { currentYearMonth } from '../rules/yearMonth'

function createOngoingPeriod(): DateRange {
  return { start: currentYearMonth(), end: 'present' }
}

export function createEmptyContact(): ContactItem {
  return { kind: 'email', label: '' }
}

export function createEmptyEducation(): Education {
  return { institution: '', degree: '', location: '', period: createOngoingPeriod(), highlights: [] }
}

export function createEmptyExperience(): Experience {
  return { company: '', role: '', location: '', period: createOngoingPeriod(), highlights: [] }
}

export function createEmptySkillCategory(): SkillCategory {
  return { name: '', items: [] }
}

export function createEmptyCertification(): Certification {
  return { name: '', issuer: '' }
}

export function createEmptyHighlight(): Highlight {
  return ''
}
