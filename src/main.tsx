import '@fontsource/lato/400.css'
import '@fontsource/lato/400-italic.css'
import '@fontsource/lato/700.css'
import './presentation/styles/app.css'
import './presentation/styles/resume-base.css'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { container } from './di/container'
import { App } from './presentation/App'
import { ContainerProvider } from './presentation/di/ContainerProvider'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ContainerProvider container={container}>
      <App />
    </ContainerProvider>
  </StrictMode>,
)
