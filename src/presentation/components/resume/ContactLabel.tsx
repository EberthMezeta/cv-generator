import type { ContactItem } from '../../../domain/entities/Resume'
import { contactHref } from './contactHref'

export function ContactLabel({ contact }: { contact: ContactItem }) {
  const href = contactHref(contact)
  if (!href) return <span>{contact.label}</span>
  return (
    <a href={href} className="cv-link">
      {contact.label}
    </a>
  )
}
