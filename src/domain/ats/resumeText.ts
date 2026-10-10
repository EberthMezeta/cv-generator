import type { Highlight, Resume } from '../entities/Resume'

export function highlightText(highlight: Highlight): string {
  return typeof highlight === 'string' ? highlight : `${highlight.label} ${highlight.text}`
}

export function allHighlights(resume: Resume): string[] {
  const educationHighlights = resume.education.flatMap((education) => education.highlights ?? [])
  const experienceHighlights = resume.experience.flatMap((experience) => experience.highlights)
  return [...educationHighlights, ...experienceHighlights].map(highlightText)
}

export function resumeSearchableText(resume: Resume): string {
  return [
    resume.personal.fullName,
    ...resume.personal.contacts.map((contact) => contact.label),
    ...resume.education.flatMap((education) => [education.institution, education.degree, education.location]),
    ...resume.experience.flatMap((experience) => [experience.company, experience.role, experience.location]),
    ...resume.skills.flatMap((category) => [category.name, ...category.items]),
    ...resume.certifications.flatMap((certification) => [certification.name, certification.issuer]),
    ...allHighlights(resume),
  ].join('\n')
}
