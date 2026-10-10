import type { IconType } from 'react-icons'

interface Props {
  label: string
  icon: IconType
  onClick: () => void
  disabled?: boolean
  tone?: 'neutral' | 'danger'
}

export function IconButton({ label, icon: Icon, onClick, disabled = false, tone = 'neutral' }: Props) {
  return (
    <button
      type="button"
      className={`icon-button icon-button--${tone}`}
      aria-label={label}
      title={label}
      disabled={disabled}
      onClick={onClick}
    >
      <Icon aria-hidden="true" />
    </button>
  )
}
