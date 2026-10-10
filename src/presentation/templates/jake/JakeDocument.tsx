import './jake.css'
import { ResumeSections } from '../../components/resume/ResumeSections'
import type { ResumeTemplateProps } from '../ResumeTemplate'
import { JakeHeader } from './JakeHeader'

export function JakeDocument({ resume, ref }: ResumeTemplateProps) {
  return (
    <article ref={ref} className="cv-page template-jake" lang={resume.locale}>
      <JakeHeader personal={resume.personal} />
      <ResumeSections resume={resume} />
    </article>
  )
}
