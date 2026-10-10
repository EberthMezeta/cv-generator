import type { Locale, SectionId } from '../../domain/entities/Resume'

export const sectionTitles: Record<Locale, Record<SectionId, string>> = {
  es: {
    education: 'Educación',
    skills: 'Habilidades Técnicas',
    experience: 'Experiencia',
    certifications: 'Certificaciones',
  },
  en: {
    education: 'Education',
    skills: 'Technical Skills',
    experience: 'Experience',
    certifications: 'Certifications',
  },
}
