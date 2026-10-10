import type { YearMonth } from '../entities/Resume'

const YEAR_MONTH_PATTERN = /^\d{4}-(0[1-9]|1[0-2])$/

export function isYearMonth(value: string): value is YearMonth {
  return YEAR_MONTH_PATTERN.test(value)
}

export function currentYearMonth(): YearMonth {
  return new Date().toISOString().slice(0, 7) as YearMonth
}
