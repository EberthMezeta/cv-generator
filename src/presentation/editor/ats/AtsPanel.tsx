import type { AtsCheck } from '../../../domain/ats/formatChecks'
import type { JobMatch } from '../../../domain/ats/keywordMatch'
import { FormatChecklist } from './FormatChecklist'
import { JobMatchAnalyzer } from './JobMatchAnalyzer'
import { ScoreMeter } from './ScoreMeter'

interface Props {
  formatChecks: readonly AtsCheck[]
  formatScore: number
  jobDescription: string
  onJobDescriptionChange: (jobDescription: string) => void
  jobMatch: JobMatch
}

export function AtsPanel({ formatChecks, formatScore, jobDescription, onJobDescriptionChange, jobMatch }: Props) {
  return (
    <>
      <p className="editor-hint">
        Ambas plantillas usan una sola columna, encabezados estándar y texto real seleccionable, el formato que
        los ATS leen sin problemas. Revisa también el contenido:
      </p>
      <ScoreMeter label="Formato y contenido" score={formatScore} />
      <FormatChecklist checks={formatChecks} />
      <h3 className="editor-subtitle">Comparar con una vacante</h3>
      <JobMatchAnalyzer
        jobDescription={jobDescription}
        onJobDescriptionChange={onJobDescriptionChange}
        match={jobMatch}
      />
    </>
  )
}
