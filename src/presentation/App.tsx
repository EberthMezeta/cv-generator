import { useMemo, useState } from 'react'
import type { Resume } from '../domain/entities/Resume'
import { validateResume } from '../domain/rules/validateResume'
import { BackupControls } from './components/layout/BackupControls'
import { PreviewPane } from './components/layout/PreviewPane'
import { SaveIndicator } from './components/layout/SaveIndicator'
import { TemplatePicker } from './components/layout/TemplatePicker'
import { Toolbar } from './components/layout/Toolbar'
import { ValidationBanner } from './components/layout/ValidationBanner'
import { ResumeEditor } from './editor/ResumeEditor'
import { useResumeEditor } from './hooks/useResumeEditor'
import { useTemplateSelection } from './hooks/useTemplateSelection'

export function App() {
  const { loadState, ...editor } = useResumeEditor()

  if (loadState.status === 'loading') return <p className="status">Cargando…</p>
  if (loadState.status === 'error') return <p className="status">Error: {loadState.error.message}</p>

  return <Workspace resume={loadState.resume} {...editor} />
}

type WorkspaceProps = { resume: Resume } & Omit<ReturnType<typeof useResumeEditor>, 'loadState'>

function Workspace({ resume, saveStatus, updateField, exportPdf, downloadBackup, restoreBackup, resetToInitial }: WorkspaceProps) {
  const { templates, selectedTemplate, selectTemplate } = useTemplateSelection()
  const [pageCount, setPageCount] = useState(1)
  const issues = useMemo(() => validateResume(resume), [resume])

  return (
    <div className="app">
      <Toolbar pageCount={pageCount}>
        <SaveIndicator status={saveStatus} />
        <TemplatePicker templates={templates} selectedTemplateId={selectedTemplate.id} onSelect={selectTemplate} />
        <BackupControls onDownload={downloadBackup} onRestore={restoreBackup} onReset={resetToInitial} />
        <button type="button" className="button button--primary" onClick={exportPdf}>
          Descargar PDF
        </button>
      </Toolbar>
      <main className="workspace">
        <aside className="workspace__editor">
          <ValidationBanner issues={issues} />
          <ResumeEditor resume={resume} onFieldChange={updateField} />
        </aside>
        <section className="workspace__preview" aria-label="Vista previa">
          <PreviewPane resume={resume} template={selectedTemplate} onPageCountChange={setPageCount} />
        </section>
      </main>
    </div>
  )
}
