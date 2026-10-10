import type { ChangeEvent } from 'react'
import { useContainer } from '../../di/useContainer'

interface Props {
  value: string | undefined
  onChange: (photo: string | undefined) => void
}

export function PhotoEditor({ value, onChange }: Props) {
  const { preparePhoto } = useContainer()

  const handleFileSelected = (event: ChangeEvent<HTMLInputElement>) => {
    const input = event.currentTarget
    const file = input.files?.[0]
    input.value = ''
    if (!file) return
    preparePhoto
      .execute(file)
      .then(onChange)
      .catch(() => window.alert('No se pudo leer la imagen. Prueba con un JPG o PNG.'))
  }

  return (
    <div className="photo-editor">
      {value ? <img className="photo-editor__preview" src={value} alt="Foto actual" /> : <div className="photo-editor__empty">Sin foto</div>}
      <div className="photo-editor__actions">
        <label className="button button--ghost">
          {value ? 'Cambiar foto' : 'Subir foto'}
          <input type="file" accept="image/*" hidden onChange={handleFileSelected} />
        </label>
        {value && (
          <button type="button" className="button button--ghost" onClick={() => onChange(undefined)}>
            Quitar
          </button>
        )}
      </div>
    </div>
  )
}
