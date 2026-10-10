import { describe, expect, it } from 'vitest'
import { sampleResume } from '../../../data/sampleResume'
import type { Resume } from '../../entities/Resume'
import { atsFormatScore, runAtsFormatChecks } from '../formatChecks'

function failedCheckIds(resume: Resume): string[] {
  return runAtsFormatChecks(resume)
    .filter((check) => !check.passed)
    .map((check) => check.id)
}

describe('runAtsFormatChecks', () => {
  it('passes every check for the sample resume', () => {
    expect(failedCheckIds(sampleResume)).toEqual([])
    expect(atsFormatScore(runAtsFormatChecks(sampleResume))).toBe(100)
  })

  it('flags missing email and phone', () => {
    const resume: Resume = { ...sampleResume, personal: { ...sampleResume.personal, contacts: [] } }

    expect(failedCheckIds(resume)).toEqual(expect.arrayContaining(['contact-email', 'contact-phone']))
  })

  it('flags hidden standard sections', () => {
    const resume: Resume = { ...sampleResume, sections: ['experience', 'certifications'] }

    expect(failedCheckIds(resume)).toContain('standard-sections')
  })

  it('notes the photo without lowering the score', () => {
    const resume: Resume = { ...sampleResume, personal: { ...sampleResume.personal, photo: 'data:image/jpeg;base64,' } }

    expect(failedCheckIds(resume)).toEqual(['no-photo'])
    expect(atsFormatScore(runAtsFormatChecks(resume))).toBe(100)
  })

  it('flags empty highlights', () => {
    const [firstExperience, ...otherExperiences] = sampleResume.experience
    const resume: Resume = {
      ...sampleResume,
      experience: [{ ...firstExperience, highlights: [...firstExperience.highlights, ''] }, ...otherExperiences],
    }

    expect(failedCheckIds(resume)).toContain('no-empty-entries')
  })
})
