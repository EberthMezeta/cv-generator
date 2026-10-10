import type { ReactNode } from 'react'

interface Props {
  pageCount: number
  saveIndicator: ReactNode
  children: ReactNode
}

export function Toolbar({ pageCount, saveIndicator, children }: Props) {
  const exceedsOnePage = pageCount > 1
  return (
    <header className="toolbar">
      <div className="toolbar__status">
        <span className="toolbar__title">CV Generator</span>
        <span className={exceedsOnePage ? 'toolbar__pages toolbar__pages--warn' : 'toolbar__pages'}>
          {pageCount} {pageCount === 1 ? 'página' : 'páginas'}
        </span>
        {saveIndicator}
      </div>
      <div className="toolbar__actions">{children}</div>
    </header>
  )
}
