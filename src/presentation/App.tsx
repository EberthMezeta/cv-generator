import { useState } from 'react'
import { PreviewPane } from './components/layout/PreviewPane'
import { TemplatePicker } from './components/layout/TemplatePicker'
import { Toolbar } from './components/layout/Toolbar'
import { ValidationBanner } from './components/layout/ValidationBanner'
import { useResume } from './hooks/useResume'
import { useTemplateSelection } from './hooks/useTemplateSelection'

export function App() {
  const { state, exportPdf } = useResume()
  const { templates, selectedTemplate, selectTemplate } = useTemplateSelection()
  const [pageCount, setPageCount] = useState(1)

  if (state.status === 'loading') return <p className="status">Cargando…</p>
  if (state.status === 'error') return <p className="status">Error: {state.error.message}</p>

  return (
    <div className="app">
      <Toolbar pageCount={pageCount} onExport={exportPdf}>
        <TemplatePicker
          templates={templates}
          selectedTemplateId={selectedTemplate.id}
          onSelect={selectTemplate}
        />
      </Toolbar>
      <ValidationBanner issues={state.issues} />
      <PreviewPane resume={state.resume} template={selectedTemplate} onPageCountChange={setPageCount} />
    </div>
  )
}
