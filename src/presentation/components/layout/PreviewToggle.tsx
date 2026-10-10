import { FaEye, FaEyeSlash, FaPen } from 'react-icons/fa6'

interface Props {
  isCompact: boolean
  isPreviewVisible: boolean
  onToggle: () => void
}

function toggleContent(isCompact: boolean, isPreviewVisible: boolean) {
  if (isCompact) return isPreviewVisible ? { Icon: FaPen, label: 'Editar' } : { Icon: FaEye, label: 'Ver CV' }
  return isPreviewVisible
    ? { Icon: FaEyeSlash, label: 'Ocultar vista previa' }
    : { Icon: FaEye, label: 'Mostrar vista previa' }
}

export function PreviewToggle({ isCompact, isPreviewVisible, onToggle }: Props) {
  const { Icon, label } = toggleContent(isCompact, isPreviewVisible)
  return (
    <button type="button" className="button button--ghost" aria-pressed={isPreviewVisible} onClick={onToggle}>
      <Icon aria-hidden="true" /> {label}
    </button>
  )
}
