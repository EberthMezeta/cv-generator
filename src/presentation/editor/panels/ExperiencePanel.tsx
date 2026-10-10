import type { Experience } from '../../../domain/entities/Resume'
import { createEmptyExperience } from '../../../domain/factories/emptyEntries'
import type { EditorValueProps } from '../EditorValueProps'
import { TextField } from '../fields/TextField'
import { ListEditor } from '../ListEditor'
import { HighlightsEditor } from './HighlightsEditor'
import { PeriodEditor } from './PeriodEditor'

export function ExperiencePanel({ value, onChange }: EditorValueProps<Experience[]>) {
  return (
    <ListEditor
      items={value}
      onChange={onChange}
      createItem={createEmptyExperience}
      addLabel="Agregar experiencia"
      getItemTitle={(experience, index) => experience.company || `Experiencia ${index + 1}`}
      renderItem={(experience, onExperienceChange) => (
        <>
          <TextField
            label="Empresa"
            value={experience.company}
            onChange={(company) => onExperienceChange({ ...experience, company })}
          />
          <div className="field-row">
            <TextField
              label="Puesto"
              value={experience.role}
              onChange={(role) => onExperienceChange({ ...experience, role })}
            />
            <TextField
              label="Ubicación"
              value={experience.location}
              onChange={(location) => onExperienceChange({ ...experience, location })}
            />
          </div>
          <PeriodEditor
            value={experience.period}
            onChange={(period) => onExperienceChange({ ...experience, period })}
          />
          <HighlightsEditor
            value={experience.highlights}
            onChange={(highlights) => onExperienceChange({ ...experience, highlights })}
          />
        </>
      )}
    />
  )
}
