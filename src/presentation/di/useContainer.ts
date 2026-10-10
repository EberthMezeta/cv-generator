import { use } from 'react'
import type { Container } from '../../di/container'
import { ContainerContext } from './ContainerContext'

export function useContainer(): Container {
  const container = use(ContainerContext)
  if (!container) throw new Error('useContainer must be used inside <ContainerProvider>')
  return container
}
