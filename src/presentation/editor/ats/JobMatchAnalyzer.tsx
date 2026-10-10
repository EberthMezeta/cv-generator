import type { JobMatch } from '../../../domain/ats/keywordMatch'
import { TextAreaField } from '../fields/TextAreaField'
import { KeywordChips } from './KeywordChips'
import { ScoreMeter } from './ScoreMeter'

interface Props {
  jobDescription: string
  onJobDescriptionChange: (jobDescription: string) => void
  match: JobMatch
}

export function JobMatchAnalyzer({ jobDescription, onJobDescriptionChange, match }: Props) {
  const hasKeywords = match.matched.length + match.missing.length > 0

  return (
    <>
      <TextAreaField
        label="Pega la descripción de la vacante"
        rows={5}
        value={jobDescription}
        placeholder="Buscamos desarrollador con experiencia en React, TypeScript, Node.js…"
        onChange={onJobDescriptionChange}
      />
      {hasKeywords && (
        <>
          <ScoreMeter label="Coincidencia de palabras clave" score={match.score} />
          <KeywordChips title="En tu CV" keywords={match.matched} tone="matched" />
          <KeywordChips title="Faltan en tu CV" keywords={match.missing} tone="missing" />
          <p className="editor-hint">
            Agrega las palabras que faltan solo si de verdad las dominas, usando el mismo término que la vacante.
          </p>
        </>
      )}
    </>
  )
}
