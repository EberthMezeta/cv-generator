interface Props {
  label: string
  value: string
  onChange: (value: string) => void
  type?: 'text' | 'email' | 'tel' | 'url'
  placeholder?: string
}

export function TextField({ label, value, onChange, type = 'text', placeholder }: Props) {
  return (
    <label className="field">
      <span className="field__label">{label}</span>
      <input
        className="field__control"
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
      />
    </label>
  )
}
