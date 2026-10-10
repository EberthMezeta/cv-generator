import type { SkillCategory } from '../../../domain/entities/Resume'
import { createEmptySkillCategory } from '../../../domain/factories/emptyEntries'
import type { EditorValueProps } from '../EditorValueProps'
import { TextAreaField } from '../fields/TextAreaField'
import { TextField } from '../fields/TextField'
import { ListEditor } from '../ListEditor'

const ITEM_SEPARATOR = ', '

function splitCommaSeparated(text: string): string[] {
  return text.split(',').map((item) => item.trimStart())
}

export function SkillsPanel({ value, onChange }: EditorValueProps<SkillCategory[]>) {
  return (
    <ListEditor
      items={value}
      onChange={onChange}
      createItem={createEmptySkillCategory}
      addLabel="Agregar categoría"
      getItemTitle={(category, index) => category.name || `Categoría ${index + 1}`}
      renderItem={(category, onCategoryChange) => (
        <>
          <TextField
            label="Categoría"
            value={category.name}
            placeholder="Lenguajes"
            onChange={(name) => onCategoryChange({ ...category, name })}
          />
          <TextAreaField
            label="Elementos (separados por coma)"
            rows={2}
            value={category.items.join(ITEM_SEPARATOR)}
            placeholder="Java, TypeScript, Python"
            onChange={(text) => onCategoryChange({ ...category, items: splitCommaSeparated(text) })}
          />
        </>
      )}
    />
  )
}
