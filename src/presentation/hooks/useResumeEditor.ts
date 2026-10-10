import { useCallback, useEffect, useState } from 'react'
import type { Resume } from '../../domain/entities/Resume'
import { useContainer } from '../di/useContainer'

const AUTOSAVE_DELAY_MS = 400

type LoadState = { status: 'loading' } | { status: 'error'; error: Error } | { status: 'ready'; resume: Resume }

export type ResumeEditor = ReturnType<typeof useResumeEditor>

export type SaveStatus = 'saved' | 'pending' | 'failed'

export type ResumeFieldUpdater = <Field extends keyof Resume>(field: Field, value: Resume[Field]) => void

export function useResumeEditor() {
  const {
    getResume,
    saveResume,
    resetResume,
    exportResumeToPdf,
    downloadResumeBackup,
    downloadResumeTemplate,
    restoreResumeBackup,
  } = useContainer()
  const [loadState, setLoadState] = useState<LoadState>({ status: 'loading' })
  const [saveStatus, setSaveStatus] = useState<SaveStatus>('saved')

  const resume = loadState.status === 'ready' ? loadState.resume : null

  useEffect(() => {
    let cancelled = false
    getResume
      .execute()
      .then((loadedResume) => !cancelled && setLoadState({ status: 'ready', resume: loadedResume }))
      .catch((error: Error) => !cancelled && setLoadState({ status: 'error', error }))
    return () => {
      cancelled = true
    }
  }, [getResume])

  useEffect(() => {
    if (!resume) return
    const timeoutId = setTimeout(() => {
      saveResume
        .execute(resume)
        .then(() => setSaveStatus('saved'))
        .catch(() => setSaveStatus('failed'))
    }, AUTOSAVE_DELAY_MS)
    return () => clearTimeout(timeoutId)
  }, [resume, saveResume])

  const replaceResume = useCallback((nextResume: Resume) => {
    setLoadState({ status: 'ready', resume: nextResume })
  }, [])

  const updateField: ResumeFieldUpdater = useCallback((field, value) => {
    setSaveStatus('pending')
    setLoadState((current) =>
      current.status === 'ready' ? { status: 'ready', resume: { ...current.resume, [field]: value } } : current,
    )
  }, [])

  const exportPdf = useCallback(() => {
    if (resume) void exportResumeToPdf.execute(resume)
  }, [resume, exportResumeToPdf])

  const downloadBackup = useCallback(() => {
    if (resume) downloadResumeBackup.execute(resume)
  }, [resume, downloadResumeBackup])

  const downloadTemplate = useCallback(() => downloadResumeTemplate.execute(), [downloadResumeTemplate])

  const restoreBackup = useCallback(
    (file: File) => restoreResumeBackup.execute(file).then(replaceResume),
    [restoreResumeBackup, replaceResume],
  )

  const resetToInitial = useCallback(
    () => resetResume.execute().then(replaceResume),
    [resetResume, replaceResume],
  )

  return {
    loadState,
    saveStatus,
    updateField,
    exportPdf,
    downloadBackup,
    downloadTemplate,
    restoreBackup,
    resetToInitial,
  }
}
