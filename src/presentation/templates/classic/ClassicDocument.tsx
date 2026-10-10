import '@fontsource/source-serif-4/400.css'
import '@fontsource/source-serif-4/400-italic.css'
import '@fontsource/source-serif-4/700.css'
import './classic.css'
import { ResumeSections } from '../../components/resume/ResumeSections'
import type { ResumeTemplateProps } from '../ResumeTemplate'
import { ClassicHeader } from './ClassicHeader'

export function ClassicDocument({ resume, ref }: ResumeTemplateProps) {
  return (
    <article ref={ref} className="cv-page template-classic" lang={resume.locale}>
      <ClassicHeader personal={resume.personal} />
      <ResumeSections resume={resume} />
    </article>
  )
}
