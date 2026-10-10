import type { ReactNode } from 'react'
import type { Resume, SectionId } from '../../../domain/entities/Resume'
import { CertificationsSection, EducationSection, ExperienceSection, SkillsSection } from './sections'

type SectionRenderer = (resume: Resume) => ReactNode

export const sectionRenderers: Record<SectionId, SectionRenderer> = {
  education: (resume) => <EducationSection items={resume.education} locale={resume.locale} />,
  skills: (resume) => <SkillsSection items={resume.skills} />,
  experience: (resume) => <ExperienceSection items={resume.experience} locale={resume.locale} />,
  certifications: (resume) => <CertificationsSection items={resume.certifications} />,
}
