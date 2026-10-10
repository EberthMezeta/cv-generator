import type { ContactItem, ContactKind } from '../../../domain/entities/Resume'
import { createEmptyContact } from '../../../domain/factories/emptyEntries'
import type { EditorValueProps } from '../EditorValueProps'
import { SelectField, type SelectOption } from '../fields/SelectField'
import { TextField } from '../fields/TextField'
import { ListEditor } from '../ListEditor'

const CONTACT_KIND_OPTIONS: readonly SelectOption<ContactKind>[] = [
  { value: 'phone', label: 'Teléfono' },
  { value: 'email', label: 'Correo' },
  { value: 'linkedin', label: 'LinkedIn' },
  { value: 'github', label: 'GitHub' },
  { value: 'website', label: 'Sitio web' },
  { value: 'location', label: 'Ubicación' },
]

function contactKindLabel(kind: ContactKind): string {
  return CONTACT_KIND_OPTIONS.find((option) => option.value === kind)?.label ?? kind
}

export function ContactsEditor({ value, onChange }: EditorValueProps<ContactItem[]>) {
  return (
    <ListEditor
      variant="compact"
      items={value}
      onChange={onChange}
      createItem={createEmptyContact}
      addLabel="Agregar contacto"
      getItemTitle={(contact) => contactKindLabel(contact.kind)}
      renderItem={(contact, onContactChange) => (
        <div className="field-row">
          <SelectField
            label="Tipo"
            value={contact.kind}
            options={CONTACT_KIND_OPTIONS}
            onChange={(kind) => onContactChange({ ...contact, kind })}
          />
          <TextField
            label="Texto visible"
            value={contact.label}
            onChange={(label) => onContactChange({ ...contact, label })}
          />
          <TextField
            label="Enlace (opcional)"
            type="url"
            value={contact.href ?? ''}
            onChange={(href) => onContactChange({ ...contact, href: href || undefined })}
          />
        </div>
      )}
    />
  )
}
