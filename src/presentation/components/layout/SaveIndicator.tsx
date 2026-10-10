import type { SaveStatus } from '../../hooks/useResumeEditor'

const SAVE_STATUS_LABEL: Record<SaveStatus, string> = {
  saved: 'Guardado',
  pending: 'Guardando…',
  failed: 'No se pudo guardar',
}

export function SaveIndicator({ status }: { status: SaveStatus }) {
  return <span className={`save-indicator save-indicator--${status}`}>{SAVE_STATUS_LABEL[status]}</span>
}
