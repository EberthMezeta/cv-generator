import type { ComponentType, Ref } from 'react'
import type { Resume } from '../../domain/entities/Resume'

export interface ResumeTemplateProps {
  resume: Resume
  ref?: Ref<HTMLElement>
}

export interface ResumeTemplate {
  id: string
  name: string
  Document: ComponentType<ResumeTemplateProps>
}
