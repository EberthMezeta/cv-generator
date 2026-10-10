import type { Resume } from '../entities/Resume'
import { resumeSearchableText } from './resumeText'
import { STOPWORDS } from './stopwords'

const MAX_KEYWORDS = 30
const MIN_KEYWORD_LENGTH = 3
const TOKEN_PATTERN = /[a-z0-9][a-z0-9+#.]*[a-z0-9+#]|[a-z0-9]/g
const SYMBOL_KEYWORD_PATTERN = /[+#]/
const NUMBER_PATTERN = /^[\d.]+$/

export interface JobMatch {
  score: number
  matched: string[]
  missing: string[]
}

function normalizeText(text: string): string {
  return text.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase()
}

function tokenize(text: string): string[] {
  return normalizeText(text).match(TOKEN_PATTERN) ?? []
}

const MIN_STEMMABLE_LENGTH = 5
const SPANISH_AGENT_NOUN_PATTERN = /(or)(es|a|as)$/
const PLURAL_SUFFIX = 's'

function stem(token: string): string {
  if (token.length < MIN_STEMMABLE_LENGTH) return token
  if (SPANISH_AGENT_NOUN_PATTERN.test(token)) return token.replace(SPANISH_AGENT_NOUN_PATTERN, '$1')
  return token.endsWith(PLURAL_SUFFIX) ? token.slice(0, -1) : token
}

function isMeaningfulKeyword(token: string): boolean {
  const hasEnoughLength = token.length >= MIN_KEYWORD_LENGTH || SYMBOL_KEYWORD_PATTERN.test(token)
  return hasEnoughLength && !STOPWORDS.has(token) && !NUMBER_PATTERN.test(token)
}

export function extractJobKeywords(jobDescription: string): string[] {
  const occurrencesByStem = new Map<string, { keyword: string; count: number }>()

  for (const token of tokenize(jobDescription).filter(isMeaningfulKeyword)) {
    const tokenStem = stem(token)
    const entry = occurrencesByStem.get(tokenStem)
    if (entry) entry.count += 1
    else occurrencesByStem.set(tokenStem, { keyword: token, count: 1 })
  }

  return [...occurrencesByStem.values()]
    .sort((first, second) => second.count - first.count)
    .slice(0, MAX_KEYWORDS)
    .map((entry) => entry.keyword)
}

export function matchJobDescription(resume: Resume, jobDescription: string): JobMatch {
  const keywords = extractJobKeywords(jobDescription)
  const resumeStems = new Set(tokenize(resumeSearchableText(resume)).map(stem))
  const isInResume = (keyword: string) => resumeStems.has(stem(keyword))

  const matched = keywords.filter(isInResume)
  const missing = keywords.filter((keyword) => !isInResume(keyword))
  const score = keywords.length === 0 ? 0 : Math.round((matched.length / keywords.length) * 100)

  return { score, matched, missing }
}
