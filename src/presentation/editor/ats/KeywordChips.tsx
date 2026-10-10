interface Props {
  title: string
  keywords: readonly string[]
  tone: 'matched' | 'missing'
}

export function KeywordChips({ title, keywords, tone }: Props) {
  if (keywords.length === 0) return null
  return (
    <div className="keyword-group">
      <span className="keyword-group__title">
        {title} ({keywords.length})
      </span>
      <ul className="keyword-chips">
        {keywords.map((keyword) => (
          <li key={keyword} className={`keyword-chip keyword-chip--${tone}`}>
            {keyword}
          </li>
        ))}
      </ul>
    </div>
  )
}
