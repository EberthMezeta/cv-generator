import { describe, expect, it } from 'vitest'
import { sampleResume } from '../../../data/sampleResume'
import { extractJobKeywords, matchJobDescription } from '../keywordMatch'

const JOB_DESCRIPTION = `Buscamos Desarrollador Full Stack con experiencia en React, TypeScript y Node.js.
Requisitos: 3 años de experiencia con React y Next.js, manejo de PostgreSQL, Docker y Kubernetes.
Deseable: AWS, CI/CD, pruebas con Jest, C# o C++.`

describe('extractJobKeywords', () => {
  it('keeps technical terms with symbols and ignores stopwords and numbers', () => {
    const keywords = extractJobKeywords(JOB_DESCRIPTION)

    expect(keywords).toEqual(expect.arrayContaining(['react', 'typescript', 'node.js', 'c#', 'c++', 'kubernetes']))
    expect(keywords).not.toEqual(expect.arrayContaining(['con', 'experiencia', 'requisitos', '3']))
  })

  it('ranks the most repeated keywords first', () => {
    expect(extractJobKeywords(JOB_DESCRIPTION)[0]).toBe('react')
  })

  it('returns no keywords for an empty description', () => {
    expect(extractJobKeywords('   ')).toEqual([])
  })
})

describe('matchJobDescription', () => {
  it('splits keywords into matched and missing ignoring case and accents', () => {
    const match = matchJobDescription(sampleResume, JOB_DESCRIPTION)

    expect(match.matched).toEqual(expect.arrayContaining(['react', 'typescript', 'node.js', 'postgresql', 'docker']))
    expect(match.missing).toEqual(expect.arrayContaining(['kubernetes', 'jest', 'next.js']))
    expect(match.score).toBeGreaterThan(0)
    expect(match.score).toBeLessThan(100)
  })

  it('matches Spanish gender and plural variants of the same word', () => {
    const match = matchJobDescription(sampleResume, 'Desarrolladores con pipelines y servicio')

    expect(match.matched).toEqual(['desarrolladores', 'pipelines', 'servicio'])
  })

  it('scores zero when there is no description', () => {
    expect(matchJobDescription(sampleResume, '').score).toBe(0)
  })
})
