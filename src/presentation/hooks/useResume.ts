import { useCallback, useEffect, useState } from 'react'
import type { GetResumeResult } from '../../application/use-cases/GetResume'
import { useContainer } from '../di/useContainer'

type State =
  | { status: 'loading' }
  | { status: 'error'; error: Error }
  | ({ status: 'ready' } & GetResumeResult)

export function useResume() {
  const { getResume, exportResume } = useContainer()
  const [state, setState] = useState<State>({ status: 'loading' })

  useEffect(() => {
    let cancelled = false
    getResume
      .execute()
      .then((result) => !cancelled && setState({ status: 'ready', ...result }))
      .catch((error: Error) => !cancelled && setState({ status: 'error', error }))
    return () => {
      cancelled = true
    }
  }, [getResume])

  const exportPdf = useCallback(() => {
    if (state.status === 'ready') void exportResume.execute(state.resume)
  }, [exportResume, state])

  return { state, exportPdf }
}
