import type { Highlight } from '../../../domain/entities/Resume'

export function HighlightList({ items }: { items: Highlight[] }) {
  if (items.length === 0) return null
  return (
    <ul className="cv-highlights">
      {items.map((item, i) =>
        typeof item === 'string' ? (
          <li key={i}>{item}</li>
        ) : (
          <li key={i}>
            <strong>{item.label}</strong> {item.text}
          </li>
        ),
      )}
    </ul>
  )
}
