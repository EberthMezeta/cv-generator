import type { Resume } from '../../domain/entities/Resume'
import { useAtsAnalysis } from '../hooks/useAtsAnalysis'
import type { ResumeFieldUpdater } from '../hooks/useResumeEditor'
import { AtsPanel } from './ats/AtsPanel'
import { ScoreBadge } from './ats/ScoreBadge'
import { EditorPanel } from './EditorPanel'
import { CertificationsPanel } from './panels/CertificationsPanel'
import { ContactsEditor } from './panels/ContactsEditor'
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
  const ats = useAtsAnalysis(resume)
  const hasJobDescription = ats.jobDescription.trim().length > 0

  return (
    <form className="resume-editor" onSubmit={(event) => event.preventDefault()}>
      <EditorPanel
        title="Compatibilidad ATS"
        badge={
          <span className="editor-panel__badges">
            <ScoreBadge label="Formato" score={ats.formatScore} />
            {hasJobDescription && <ScoreBadge label="Vacante" score={ats.jobMatch.score} />}
          </span>
        }
      >
        <AtsPanel
          formatChecks={ats.formatChecks}
          formatScore={ats.formatScore}
          jobDescription={ats.jobDescription}
          onJobDescriptionChange={ats.setJobDescription}
          jobMatch={ats.jobMatch}
        />
      </EditorPanel>
      <EditorPanel title="Datos personales" defaultOpen>
        <PersonalPanel value={resume.personal} onChange={(personal) => onFieldChange('personal', personal)} />
      </EditorPanel>
      <EditorPanel title="Contacto">
        <ContactsEditor
          value={resume.personal.contacts}
          onChange={(contacts) => onFieldChange('personal', { ...resume.personal, contacts })}
        />
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
