const GOOD_SCORE = 80
const FAIR_SCORE = 50

export type ScoreTone = 'good' | 'fair' | 'poor'

export function scoreTone(score: number): ScoreTone {
  if (score >= GOOD_SCORE) return 'good'
  if (score >= FAIR_SCORE) return 'fair'
  return 'poor'
}
