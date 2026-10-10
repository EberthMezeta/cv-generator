import type { Certification } from '../../../domain/entities/Resume'
import { createEmptyCertification } from '../../../domain/factories/emptyEntries'
import type { EditorValueProps } from '../EditorValueProps'
import { TextField } from '../fields/TextField'
import { ListEditor } from '../ListEditor'

export function CertificationsPanel({ value, onChange }: EditorValueProps<Certification[]>) {
  return (
    <ListEditor
      variant="compact"
      items={value}
      onChange={onChange}
      createItem={createEmptyCertification}
      addLabel="Agregar certificación"
      getItemTitle={(certification, index) => certification.name || `Certificación ${index + 1}`}
      renderItem={(certification, onCertificationChange) => (
        <div className="field-row">
          <TextField
            label="Nombre"
            value={certification.name}
            onChange={(name) => onCertificationChange({ ...certification, name })}
          />
          <TextField
            label="Emisor"
            value={certification.issuer}
            onChange={(issuer) => onCertificationChange({ ...certification, issuer })}
          />
        </div>
      )}
    />
  )
}
