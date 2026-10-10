import type { Resume } from '../../../domain/entities/Resume'
import { sectionTitles } from '../../i18n/labels'
import { Section } from './Section'
import { sectionRenderers } from './sectionRenderers'

export function ResumeSections({ resume }: { resume: Resume }) {
  return resume.sections.map((sectionId) => (
    <Section key={sectionId} title={sectionTitles[resume.locale][sectionId]}>
      {sectionRenderers[sectionId](resume)}
    </Section>
  ))
}
