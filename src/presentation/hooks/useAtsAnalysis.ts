import { useDeferredValue, useMemo } from 'react'
import { atsFormatScore, runAtsFormatChecks } from '../../domain/ats/formatChecks'
import { matchJobDescription } from '../../domain/ats/keywordMatch'
import type { Resume } from '../../domain/entities/Resume'
import { usePersistentState } from './usePersistentState'

const JOB_DESCRIPTION_KEY = 'cv-generator:job-description'

export function useAtsAnalysis(resume: Resume) {
  const [jobDescription, setJobDescription] = usePersistentState(JOB_DESCRIPTION_KEY, '')
  const deferredResume = useDeferredValue(resume)
  const deferredJobDescription = useDeferredValue(jobDescription)

  const formatChecks = useMemo(() => runAtsFormatChecks(deferredResume), [deferredResume])
  const formatScore = atsFormatScore(formatChecks)
  const jobMatch = useMemo(
    () => matchJobDescription(deferredResume, deferredJobDescription),
    [deferredResume, deferredJobDescription],
  )

  return { formatChecks, formatScore, jobDescription, setJobDescription, jobMatch }
}
