
export type YearMonth = `${number}-${number}`

export interface DateRange {
  start: YearMonth
  end: YearMonth | 'present'
}

export type ContactKind = 'phone' | 'email' | 'linkedin' | 'github' | 'website' | 'location'

export interface ContactItem {
  kind: ContactKind
  label: string
  href?: string
}

export interface PersonalInfo {
  fullName: string
  photo?: string
  contacts: ContactItem[]
}

export type Highlight = string | { label: string; text: string }

export interface Education {
  institution: string
  degree: string
  location: string
  period: DateRange
  highlights?: Highlight[]
}

export interface Experience {
  company: string
  role: string
  location: string
  period: DateRange
  highlights: Highlight[]
}

export interface SkillCategory {
  name: string
  items: string[]
}

export interface Certification {
  name: string
  issuer: string
}

export type SectionId = 'education' | 'skills' | 'experience' | 'certifications'

export type Locale = 'es' | 'en'

export interface Resume {
  locale: Locale
  personal: PersonalInfo
  sections: SectionId[]
  education: Education[]
  skills: SkillCategory[]
  experience: Experience[]
  certifications: Certification[]
}
