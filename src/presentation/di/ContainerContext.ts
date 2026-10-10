import { createContext } from 'react'
import type { Container } from '../../di/container'

export const ContainerContext = createContext<Container | null>(null)
