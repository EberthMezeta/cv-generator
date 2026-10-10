export interface SelectOption<Value extends string> {
  value: Value
  label: string
}

interface Props<Value extends string> {
  label: string
  value: Value
  options: readonly SelectOption<Value>[]
  onChange: (value: Value) => void
}

export function SelectField<Value extends string>({ label, value, options, onChange }: Props<Value>) {
  return (
    <label className="field">
      <span className="field__label">{label}</span>
      <select className="field__control" value={value} onChange={(event) => onChange(event.target.value as Value)}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  )
}
