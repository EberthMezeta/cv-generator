import type { ReactNode } from 'react'

interface Props {
  title: string
  children: ReactNode
  defaultOpen?: boolean
}

export function EditorPanel({ title, children, defaultOpen = false }: Props) {
  return (
    <details className="editor-panel" open={defaultOpen}>
      <summary className="editor-panel__summary">{title}</summary>
      <div className="editor-panel__body">{children}</div>
    </details>
  )
}
