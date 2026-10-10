import type { ContactItem } from '../../../domain/entities/Resume'

export function contactHref(contact: ContactItem): string | undefined {
  if (contact.href) return contact.href
  if (contact.kind === 'email') return `mailto:${contact.label}`
  return undefined
}
