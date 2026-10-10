import type { PersonalInfo } from '../../../domain/entities/Resume'
import type { EditorValueProps } from '../EditorValueProps'
import { TextField } from '../fields/TextField'
import { ContactsEditor } from './ContactsEditor'
import { PhotoEditor } from './PhotoEditor'

export function PersonalPanel({ value, onChange }: EditorValueProps<PersonalInfo>) {
  return (
    <>
      <TextField label="Nombre completo" value={value.fullName} onChange={(fullName) => onChange({ ...value, fullName })} />
      <PhotoEditor value={value.photo} onChange={(photo) => onChange({ ...value, photo })} />
      <h3 className="editor-subtitle">Contacto</h3>
      <ContactsEditor value={value.contacts} onChange={(contacts) => onChange({ ...value, contacts })} />
    </>
  )
}
