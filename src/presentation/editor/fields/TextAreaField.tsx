interface Props {
  label: string
  value: string
  onChange: (value: string) => void
  rows?: number
  placeholder?: string
}

export function TextAreaField({ label, value, onChange, rows = 3, placeholder }: Props) {
  return (
    <label className="field">
      <span className="field__label">{label}</span>
      <textarea
        className="field__control"
        rows={rows}
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
      />
    </label>
  )
}
