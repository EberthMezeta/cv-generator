import { formatDateRange } from '../../../application/formatters/formatDateRange'
import type { Certification, Education, Experience, Locale, SkillCategory } from '../../../domain/entities/Resume'
import { HighlightList } from './HighlightList'
import { SubHeading } from './SubHeading'

export function EducationSection({ items, locale }: { items: Education[]; locale: Locale }) {
  return items.map((edu) => (
    <div key={`${edu.institution}-${edu.period.start}`} className="cv-entry">
      <SubHeading
        title={edu.institution}
        date={formatDateRange(edu.period, locale)}
        subtitle={edu.degree}
        location={edu.location}
      />
      <HighlightList items={edu.highlights ?? []} />
    </div>
  ))
}

export function ExperienceSection({ items, locale }: { items: Experience[]; locale: Locale }) {
  return items.map((job) => (
    <div key={`${job.company}-${job.period.start}`} className="cv-entry">
      <SubHeading
        title={job.company}
        date={formatDateRange(job.period, locale)}
        subtitle={job.role}
        location={job.location}
      />
      <HighlightList items={job.highlights} />
    </div>
  ))
}

export function SkillsSection({ items }: { items: SkillCategory[] }) {
  return (
    <ul className="cv-skills">
      {items.map((category) => (
        <li key={category.name}>
          <strong>{category.name}</strong>: {category.items.join(', ')}
        </li>
      ))}
    </ul>
  )
}

export function CertificationsSection({ items }: { items: Certification[] }) {
  return (
    <ul className="cv-certifications">
      {items.map((cert) => (
        <li key={`${cert.name}-${cert.issuer}`}>
          {cert.name} - <strong>{cert.issuer}</strong>
        </li>
      ))}
    </ul>
  )
}
