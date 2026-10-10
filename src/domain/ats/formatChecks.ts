import type { ContactKind, Resume, SectionId } from '../entities/Resume'
import { validateResume } from '../rules/validateResume'
import { allHighlights, highlightText } from './resumeText'

export type AtsCheckSeverity = 'critical' | 'recommended' | 'informative'

export interface AtsCheck {
  id: string
  label: string
  passed: boolean
  severity: AtsCheckSeverity
  advice: string
}

const STANDARD_SECTIONS: readonly SectionId[] = ['experience', 'education', 'skills']
const MIN_HIGHLIGHTS_PER_EXPERIENCE = 2
const MAX_HIGHLIGHT_LENGTH = 400
const DIGIT_PATTERN = /\d/

function hasContact(resume: Resume, kind: ContactKind): boolean {
  return resume.personal.contacts.some((contact) => contact.kind === kind && contact.label.trim())
}

function hasEmptyEntries(resume: Resume): boolean {
  const emptyTexts = [
    ...allHighlights(resume),
    ...resume.personal.contacts.map((contact) => contact.label),
    ...resume.skills.map((category) => category.name),
    ...resume.certifications.map((certification) => certification.name),
  ].filter((text) => !text.trim())
  return emptyTexts.length > 0
}

function everyExperienceIsDetailed(resume: Resume): boolean {
  return (
    resume.experience.length > 0 &&
    resume.experience.every(
      (experience) =>
        experience.highlights.filter((highlight) => highlightText(highlight).trim()).length >=
        MIN_HIGHLIGHTS_PER_EXPERIENCE,
    )
  )
}

export function runAtsFormatChecks(resume: Resume): AtsCheck[] {
  const highlights = allHighlights(resume)

  return [
    {
      id: 'contact-email',
      label: 'Correo electrónico',
      passed: hasContact(resume, 'email'),
      severity: 'critical',
      advice: 'Agrega un correo: los ATS lo usan para identificarte y contactarte.',
    },
    {
      id: 'contact-phone',
      label: 'Teléfono',
      passed: hasContact(resume, 'phone'),
      severity: 'critical',
      advice: 'Agrega un teléfono de contacto.',
    },
    {
      id: 'standard-sections',
      label: 'Secciones estándar visibles',
      passed: STANDARD_SECTIONS.every((sectionId) => resume.sections.includes(sectionId)),
      severity: 'critical',
      advice: 'Muestra Experiencia, Educación y Habilidades: los ATS clasifican tu información con esos encabezados.',
    },
    {
      id: 'valid-data',
      label: 'Nombre y fechas completos',
      passed: validateResume(resume).length === 0,
      severity: 'critical',
      advice: 'Corrige los avisos en rojo del formulario.',
    },
    {
      id: 'skills-listed',
      label: 'Habilidades listadas',
      passed: resume.skills.some((category) => category.items.some((item) => item.trim())),
      severity: 'critical',
      advice: 'Los ATS comparan tus habilidades con las palabras clave de la vacante.',
    },
    {
      id: 'detailed-experience',
      label: `Al menos ${MIN_HIGHLIGHTS_PER_EXPERIENCE} logros por experiencia`,
      passed: everyExperienceIsDetailed(resume),
      severity: 'recommended',
      advice: 'Describe tus logros en cada puesto; ahí es donde el ATS encuentra palabras clave.',
    },
    {
      id: 'quantified-achievements',
      label: 'Logros con cifras medibles',
      passed: highlights.some((highlight) => DIGIT_PATTERN.test(highlight)),
      severity: 'recommended',
      advice: 'Incluye números: porcentajes, tiempos, usuarios, ventas…',
    },
    {
      id: 'concise-highlights',
      label: 'Puntos concisos',
      passed: highlights.every((highlight) => highlight.length <= MAX_HIGHLIGHT_LENGTH),
      severity: 'recommended',
      advice: `Mantén cada punto por debajo de ${MAX_HIGHLIGHT_LENGTH} caracteres.`,
    },
    {
      id: 'no-empty-entries',
      label: 'Sin elementos vacíos',
      passed: !hasEmptyEntries(resume),
      severity: 'recommended',
      advice: 'Elimina contactos, puntos, categorías o certificaciones vacías.',
    },
    {
      id: 'no-photo',
      label: 'Sin foto',
      passed: !resume.personal.photo,
      severity: 'informative',
      advice: 'Muchos ATS ignoran la foto y en algunos países los reclutadores prefieren CVs sin ella.',
    },
  ]
}

export function atsFormatScore(checks: readonly AtsCheck[]): number {
  const scoredChecks = checks.filter((check) => check.severity !== 'informative')
  if (scoredChecks.length === 0) return 0
  return Math.round((scoredChecks.filter((check) => check.passed).length / scoredChecks.length) * 100)
}
