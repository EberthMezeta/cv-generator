import type { DateRange, Locale, YearMonth } from '../../domain/entities/Resume'
import { isYearMonth } from '../../domain/rules/yearMonth'

const PRESENT_LABEL: Record<Locale, string> = { es: 'Actualidad', en: 'Present' }

export function formatYearMonth(value: YearMonth, locale: Locale): string {
  if (!isYearMonth(value)) return ''
  const [year, month] = value.split('-').map(Number)
  const monthName = new Intl.DateTimeFormat(locale, { month: 'long', timeZone: 'UTC' }).format(
    new Date(Date.UTC(year, month - 1, 1)),
  )
  return `${monthName} ${year}`
}

export function formatDateRange(range: DateRange, locale: Locale): string {
  const start = formatYearMonth(range.start, locale)
  const end = range.end === 'present' ? PRESENT_LABEL[locale] : formatYearMonth(range.end, locale)
  return [start, end].filter(Boolean).join(' – ')
}
