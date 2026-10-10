import type { Resume } from '../../domain/entities/Resume'
import type { ResumeFieldUpdater } from '../hooks/useResumeEditor'
import { EditorPanel } from './EditorPanel'
import { CertificationsPanel } from './panels/CertificationsPanel'
import { EducationPanel } from './panels/EducationPanel'
import { ExperiencePanel } from './panels/ExperiencePanel'
import { PersonalPanel } from './panels/PersonalPanel'
import { SettingsPanel } from './panels/SettingsPanel'
import { SkillsPanel } from './panels/SkillsPanel'

interface Props {
  resume: Resume
  onFieldChange: ResumeFieldUpdater
}

export function ResumeEditor({ resume, onFieldChange }: Props) {
  return (
    <form className="resume-editor" onSubmit={(event) => event.preventDefault()}>
      <EditorPanel title="Datos personales" defaultOpen>
        <PersonalPanel value={resume.personal} onChange={(personal) => onFieldChange('personal', personal)} />
      </EditorPanel>
      <EditorPanel title="Idioma y secciones">
        <SettingsPanel
          locale={resume.locale}
          sections={resume.sections}
          onLocaleChange={(locale) => onFieldChange('locale', locale)}
          onSectionsChange={(sections) => onFieldChange('sections', sections)}
        />
      </EditorPanel>
      <EditorPanel title="Educación">
        <EducationPanel value={resume.education} onChange={(education) => onFieldChange('education', education)} />
      </EditorPanel>
      <EditorPanel title="Habilidades técnicas">
        <SkillsPanel value={resume.skills} onChange={(skills) => onFieldChange('skills', skills)} />
      </EditorPanel>
      <EditorPanel title="Experiencia">
        <ExperiencePanel value={resume.experience} onChange={(experience) => onFieldChange('experience', experience)} />
      </EditorPanel>
      <EditorPanel title="Certificaciones">
        <CertificationsPanel
          value={resume.certifications}
          onChange={(certifications) => onFieldChange('certifications', certifications)}
        />
      </EditorPanel>
    </form>
  )
}
