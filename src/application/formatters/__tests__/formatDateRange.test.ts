import { describe, expect, it } from 'vitest'
import { formatDateRange } from '../formatDateRange'

describe('formatDateRange', () => {
  it('formats a closed range in Spanish', () => {
    expect(formatDateRange({ start: '2018-08', end: '2023-08' }, 'es')).toBe('agosto 2018 – agosto 2023')
  })

  it('formats an ongoing range in English', () => {
    expect(formatDateRange({ start: '2023-07', end: 'present' }, 'en')).toBe('July 2023 – Present')
  })
})
