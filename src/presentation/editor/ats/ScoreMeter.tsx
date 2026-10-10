import { scoreTone } from './scoreTone'

export function ScoreMeter({ label, score }: { label: string; score: number }) {
  return (
    <div className={`score-meter score-meter--${scoreTone(score)}`}>
      <div className="score-meter__header">
        <span>{label}</span>
        <strong>{score}%</strong>
      </div>
      <div className="score-meter__track" role="meter" aria-valuenow={score} aria-valuemin={0} aria-valuemax={100} aria-label={label}>
        <div className="score-meter__fill" style={{ width: `${score}%` }} />
      </div>
    </div>
  )
}
