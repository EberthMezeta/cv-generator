import { useRef, type ChangeEvent } from 'react'
import { FaChevronDown, FaFileArrowDown, FaFileArrowUp, FaFileCode, FaRotateLeft } from 'react-icons/fa6'
import { useCloseDetailsOnOutsideClick } from '../../hooks/useCloseDetailsOnOutsideClick'

const RESET_CONFIRMATION = '¿Restaurar los datos de ejemplo? Se perderán los cambios que no hayas respaldado.'

interface Props {
  onDownloadBackup: () => void
  onDownloadTemplate: () => void
  onRestore: (file: File) => Promise<void>
  onReset: () => Promise<void>
}

export function DataMenu({ onDownloadBackup, onDownloadTemplate, onRestore, onReset }: Props) {
  const menuRef = useRef<HTMLDetailsElement>(null)
  useCloseDetailsOnOutsideClick(menuRef)

  const runAndClose = (action: () => void) => () => {
    if (menuRef.current) menuRef.current.open = false
    action()
  }

  const handleFileSelected = (event: ChangeEvent<HTMLInputElement>) => {
    const input = event.currentTarget
    const file = input.files?.[0]
    input.value = ''
    if (menuRef.current) menuRef.current.open = false
    if (file) onRestore(file).catch((error: Error) => window.alert(error.message))
  }

  const confirmReset = () => {
    if (window.confirm(RESET_CONFIRMATION)) void onReset()
  }

  return (
    <details ref={menuRef} className="menu">
      <summary className="button button--ghost">
        Datos <FaChevronDown aria-hidden="true" />
      </summary>
      <div className="menu__list">
        <button type="button" className="menu__item" onClick={runAndClose(onDownloadBackup)}>
          <FaFileArrowDown aria-hidden="true" /> Respaldar mis datos (JSON)
        </button>
        <label className="menu__item">
          <FaFileArrowUp aria-hidden="true" /> Importar JSON
          <input type="file" accept="application/json,.json" hidden onChange={handleFileSelected} />
        </label>
        <button type="button" className="menu__item" onClick={runAndClose(onDownloadTemplate)}>
          <FaFileCode aria-hidden="true" /> Descargar plantilla JSON
        </button>
        <hr className="menu__separator" />
        <button type="button" className="menu__item menu__item--danger" onClick={runAndClose(confirmReset)}>
          <FaRotateLeft aria-hidden="true" /> Restaurar ejemplo
        </button>
      </div>
    </details>
  )
}
