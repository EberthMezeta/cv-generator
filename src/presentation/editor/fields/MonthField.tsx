import type { YearMonth } from '../../../domain/entities/Resume'

interface Props {
  label: string
  value: string
  onChange: (value: YearMonth) => void
  disabled?: boolean
}

export function MonthField({ label, value, onChange, disabled = false }: Props) {
  return (
    <label className="field">
      <span className="field__label">{label}</span>
      <input
        className="field__control"
        type="month"
        value={value}
        disabled={disabled}
        onChange={(event) => onChange(event.target.value as YearMonth)}
      />
    </label>
  )
}
