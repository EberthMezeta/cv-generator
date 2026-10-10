import type { ReactNode } from 'react'

interface Props {
  title: string
  children: ReactNode
  badge?: ReactNode
  defaultOpen?: boolean
}

export function EditorPanel({ title, children, badge, defaultOpen = false }: Props) {
  return (
    <details className="editor-panel" open={defaultOpen}>
      <summary className="editor-panel__summary">
        <span className="editor-panel__title">{title}</span>
        {badge}
      </summary>
      <div className="editor-panel__body">{children}</div>
    </details>
  )
}
