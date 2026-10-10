import type { ReactNode } from 'react'
import type { Container } from '../../di/container'
import { ContainerContext } from './ContainerContext'

export function ContainerProvider({ container, children }: { container: Container; children: ReactNode }) {
  return <ContainerContext value={container}>{children}</ContainerContext>
}
