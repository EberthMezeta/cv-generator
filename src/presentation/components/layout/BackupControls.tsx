import type { ChangeEvent } from 'react'

const RESET_CONFIRMATION = '¿Restaurar los datos iniciales? Se perderán los cambios que no hayas respaldado.'

interface Props {
  onDownload: () => void
  onRestore: (file: File) => Promise<void>
  onReset: () => Promise<void>
}

export function BackupControls({ onDownload, onRestore, onReset }: Props) {
  const handleFileSelected = (event: ChangeEvent<HTMLInputElement>) => {
    const input = event.currentTarget
    const file = input.files?.[0]
    input.value = ''
    if (file) onRestore(file).catch((error: Error) => window.alert(error.message))
  }

  const handleReset = () => {
    if (window.confirm(RESET_CONFIRMATION)) void onReset()
  }

  return (
    <div className="backup-controls">
      <button type="button" className="button button--ghost" onClick={onDownload}>
        Respaldar JSON
      </button>
      <label className="button button--ghost">
        Importar JSON
        <input type="file" accept="application/json,.json" hidden onChange={handleFileSelected} />
      </label>
      <button type="button" className="button button--ghost" onClick={handleReset}>
        Restaurar inicial
      </button>
    </div>
  )
}
