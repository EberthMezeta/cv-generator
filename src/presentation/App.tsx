import { useMemo, useState } from 'react'
import type { Resume } from '../domain/entities/Resume'
import { validateResume } from '../domain/rules/validateResume'
import { DataMenu } from './components/layout/DataMenu'
import { PreviewPane } from './components/layout/PreviewPane'
import { PreviewToggle } from './components/layout/PreviewToggle'
import { SaveIndicator } from './components/layout/SaveIndicator'
import { TemplatePicker } from './components/layout/TemplatePicker'
import { Toolbar } from './components/layout/Toolbar'
import { ValidationBanner } from './components/layout/ValidationBanner'
import { ResumeEditor } from './editor/ResumeEditor'
import { useResumeEditor, type ResumeEditor as ResumeEditorActions } from './hooks/useResumeEditor'
import { useTemplateSelection } from './hooks/useTemplateSelection'
import { useWorkspaceLayout } from './hooks/useWorkspaceLayout'

export function App() {
  const { loadState, ...editorActions } = useResumeEditor()

  if (loadState.status === 'loading') return <p className="status">Cargando…</p>
  if (loadState.status === 'error') return <p className="status">Error: {loadState.error.message}</p>

  return <Workspace resume={loadState.resume} {...editorActions} />
}

type WorkspaceProps = { resume: Resume } & Omit<ResumeEditorActions, 'loadState'>

function workspaceClassName(isEditorVisible: boolean, isPreviewVisible: boolean): string {
  return [
    'workspace',
    !isEditorVisible && 'workspace--editor-hidden',
    !isPreviewVisible && 'workspace--preview-hidden',
  ]
    .filter(Boolean)
    .join(' ')
}

function Workspace({
  resume,
  saveStatus,
  updateField,
  exportPdf,
  downloadBackup,
  downloadTemplate,
  restoreBackup,
  resetToInitial,
}: WorkspaceProps) {
  const { templates, selectedTemplate, selectTemplate } = useTemplateSelection()
  const { isCompact, isPreviewVisible, isEditorVisible, togglePreview } = useWorkspaceLayout()
  const [pageCount, setPageCount] = useState(1)
  const issues = useMemo(() => validateResume(resume), [resume])

  return (
    <div className="app">
      <Toolbar pageCount={pageCount} saveIndicator={<SaveIndicator status={saveStatus} />}>
        <TemplatePicker templates={templates} selectedTemplateId={selectedTemplate.id} onSelect={selectTemplate} />
        <DataMenu
          onDownloadBackup={downloadBackup}
          onDownloadTemplate={downloadTemplate}
          onRestore={restoreBackup}
          onReset={resetToInitial}
        />
        <PreviewToggle isCompact={isCompact} isPreviewVisible={isPreviewVisible} onToggle={togglePreview} />
        <button type="button" className="button button--primary" onClick={exportPdf}>
          Descargar PDF
        </button>
      </Toolbar>
      <main className={workspaceClassName(isEditorVisible, isPreviewVisible)}>
        <div className="workspace__editor">
          <div className="workspace__editor-content">
            <ValidationBanner issues={issues} />
            <ResumeEditor resume={resume} onFieldChange={updateField} />
          </div>
        </div>
        <section className="workspace__preview" aria-label="Vista previa">
          <PreviewPane resume={resume} template={selectedTemplate} onPageCountChange={setPageCount} />
        </section>
      </main>
    </div>
  )
}
