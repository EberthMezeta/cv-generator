import { scoreTone } from './scoreTone'

export function ScoreBadge({ label, score }: { label: string; score: number }) {
  return (
    <span className={`score-badge score-badge--${scoreTone(score)}`}>
      {label} {score}%
    </span>
  )
}
