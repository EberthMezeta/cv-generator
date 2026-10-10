import type { DateRange } from '../../../domain/entities/Resume'
import type { EditorValueProps } from '../EditorValueProps'
import { CheckboxField } from '../fields/CheckboxField'
import { MonthField } from '../fields/MonthField'

export function PeriodEditor({ value, onChange }: EditorValueProps<DateRange>) {
  const isOngoing = value.end === 'present'

  return (
    <div className="field-row field-row--period">
      <MonthField label="Inicio" value={value.start} onChange={(start) => onChange({ ...value, start })} />
      <MonthField
        label="Fin"
        value={isOngoing ? '' : value.end}
        disabled={isOngoing}
        onChange={(end) => onChange({ ...value, end })}
      />
      <CheckboxField
        label="Actualidad"
        checked={isOngoing}
        onChange={(ongoing) => onChange({ ...value, end: ongoing ? 'present' : value.start })}
      />
    </div>
  )
}
