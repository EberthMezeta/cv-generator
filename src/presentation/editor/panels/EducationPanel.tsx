import type { Education } from '../../../domain/entities/Resume'
import { createEmptyEducation } from '../../../domain/factories/emptyEntries'
import type { EditorValueProps } from '../EditorValueProps'
import { TextField } from '../fields/TextField'
import { ListEditor } from '../ListEditor'
import { HighlightsEditor } from './HighlightsEditor'
import { PeriodEditor } from './PeriodEditor'

export function EducationPanel({ value, onChange }: EditorValueProps<Education[]>) {
  return (
    <ListEditor
      items={value}
      onChange={onChange}
      createItem={createEmptyEducation}
      addLabel="Agregar educación"
      getItemTitle={(education, index) => education.institution || `Educación ${index + 1}`}
      renderItem={(education, onEducationChange) => (
        <>
          <TextField
            label="Institución"
            value={education.institution}
            onChange={(institution) => onEducationChange({ ...education, institution })}
          />
          <div className="field-row">
            <TextField
              label="Título / carrera"
              value={education.degree}
              onChange={(degree) => onEducationChange({ ...education, degree })}
            />
            <TextField
              label="Ubicación"
              value={education.location}
              onChange={(location) => onEducationChange({ ...education, location })}
            />
          </div>
          <PeriodEditor value={education.period} onChange={(period) => onEducationChange({ ...education, period })} />
          <HighlightsEditor
            value={education.highlights ?? []}
            onChange={(highlights) => onEducationChange({ ...education, highlights })}
          />
        </>
      )}
    />
  )
}
