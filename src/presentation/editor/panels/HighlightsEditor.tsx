import type { Highlight } from '../../../domain/entities/Resume'
import { createEmptyHighlight } from '../../../domain/factories/emptyEntries'
import type { EditorValueProps } from '../EditorValueProps'
import { TextAreaField } from '../fields/TextAreaField'
import { TextField } from '../fields/TextField'
import { ListEditor } from '../ListEditor'

function highlightLabel(highlight: Highlight): string {
  return typeof highlight === 'string' ? '' : highlight.label
}

function highlightText(highlight: Highlight): string {
  return typeof highlight === 'string' ? highlight : highlight.text
}

function toHighlight(label: string, text: string): Highlight {
  return label ? { label, text } : text
}

export function HighlightsEditor({ value, onChange }: EditorValueProps<Highlight[]>) {
  return (
    <ListEditor
      variant="compact"
      items={value}
      onChange={onChange}
      createItem={createEmptyHighlight}
      addLabel="Agregar punto"
      getItemTitle={(_, index) => `Punto ${index + 1}`}
      renderItem={(highlight, onHighlightChange) => (
        <>
          <TextField
            label="Etiqueta en negritas (opcional)"
            value={highlightLabel(highlight)}
            placeholder="Cursos Relevantes:"
            onChange={(label) => onHighlightChange(toHighlight(label, highlightText(highlight)))}
          />
          <TextAreaField
            label="Texto"
            value={highlightText(highlight)}
            onChange={(text) => onHighlightChange(toHighlight(highlightLabel(highlight), text))}
          />
        </>
      )}
    />
  )
}
