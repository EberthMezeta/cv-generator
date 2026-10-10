import { describe, expect, it } from 'vitest'
import { sampleResume } from '../../../data/sampleResume'
import type { Resume } from '../../entities/Resume'
import { validateResume } from '../validateResume'

describe('validateResume', () => {
  it('accepts a complete resume', () => {
    expect(validateResume(sampleResume)).toEqual([])
  })

  it('rejects an end date before the start date', () => {
    const [firstEducation] = sampleResume.education
    const resume: Resume = {
      ...sampleResume,
      education: [{ ...firstEducation, period: { start: '2020-05', end: '2019-01' } }],
    }

    expect(validateResume(resume)).toEqual([
      { field: 'Educación 1', message: 'La fecha de fin es anterior a la de inicio' },
    ])
  })

  it('requires a name', () => {
    const resume: Resume = { ...sampleResume, personal: { ...sampleResume.personal, fullName: '  ' } }

    expect(validateResume(resume)).toEqual([{ field: 'Datos personales', message: 'El nombre es obligatorio' }])
  })
})
