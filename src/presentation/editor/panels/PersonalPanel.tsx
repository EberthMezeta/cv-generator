import type { PersonalInfo } from '../../../domain/entities/Resume'
import type { EditorValueProps } from '../EditorValueProps'
import { TextField } from '../fields/TextField'
import { PhotoEditor } from './PhotoEditor'

export function PersonalPanel({ value, onChange }: EditorValueProps<PersonalInfo>) {
  return (
    <>
      <TextField label="Nombre completo" value={value.fullName} onChange={(fullName) => onChange({ ...value, fullName })} />
      <PhotoEditor value={value.photo} onChange={(photo) => onChange({ ...value, photo })} />
    </>
  )
}
