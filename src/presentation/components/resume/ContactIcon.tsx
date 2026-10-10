import type { IconType } from 'react-icons'
import { FaEnvelope, FaGithub, FaGlobe, FaLinkedin, FaLocationDot, FaPhone } from 'react-icons/fa6'
import type { ContactKind } from '../../../domain/entities/Resume'

const icons: Record<ContactKind, IconType> = {
  phone: FaPhone,
  email: FaEnvelope,
  linkedin: FaLinkedin,
  github: FaGithub,
  website: FaGlobe,
  location: FaLocationDot,
}

export function ContactIcon({ kind }: { kind: ContactKind }) {
  const Icon = icons[kind]
  return <Icon className="cv-contact__icon" aria-hidden="true" />
}
