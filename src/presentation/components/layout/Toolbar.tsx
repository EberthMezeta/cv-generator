import type { ReactNode } from 'react'

interface Props {
  pageCount: number
  onExport: () => void
  children?: ReactNode
}

export function Toolbar({ pageCount, onExport, children }: Props) {
  const exceedsOnePage = pageCount > 1
  return (
    <div className="toolbar">
      <span className="toolbar__title">CV Generator</span>
      {children}
      <span className={exceedsOnePage ? 'toolbar__pages toolbar__pages--warn' : 'toolbar__pages'}>
        {pageCount} {pageCount === 1 ? 'página' : 'páginas'}
      </span>
      <button type="button" className="toolbar__button" onClick={onExport}>
        Descargar PDF
      </button>
    </div>
  )
}
